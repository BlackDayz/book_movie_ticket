const nconf = require('nconf');
const validator = require('validator');
const { generateSeatId } = require('../../../utils/functions/generateData/generateSeatId');
const { generateUserId } = require('../../../utils/functions/generateData/generateUserId');
const { getUserTmp_Token } = require('../../../utils/functions/getData/getUser');
const { insertDataInSeatsUser } = require('../../../utils/functions/insertData/insertDataInSeatsUser');
const { moveUserFromTmpToProd } = require('../../../utils/functions/moveData/moveUserFromTmpToProd');
const { sendConfirmationEmail } = require('../../../utils/functions/sendEmail/sendEmail');
const { delay } = require('../../../utils/functions/delay/delay');

module.exports = (app) => {
    app.get(nconf.get('routing:mainRoute')+nconf.get('routing:verify'), async (req, res) => {
        const token = validator.escape(req.query.token);

        if(!token) {
            return res.status(nconf.get('status:BAD_REQUEST')).json('Missing token');
        }

        const user = await getUserTmp_Token({
            token: token
        });

        if(!user) {
            return res.status(nconf.get('status:NOT_FOUND')).json('User not found.');
        }

        const userId = generateUserId();

        const movedUserData = moveUserFromTmpToProd({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            personNumber: user.personNumber,
            time: user.time,
            userId: userId
        });

        if(!movedUserData) {
            return res.status(nconf.get('status:INTERNAL_SERVER_ERROR'));
        }

        let seat_ids = [];
        for(let i = 0; i < user.personNumber; i++) {

            const seatId = await generateSeatId();

            seat_ids.push(seatId);

            const userSeatData = await insertDataInSeatsUser({
                movie_id: user.time,
                email: user.email,
                seat_id: seatId
            });

            if(!userSeatData) {
                return res.status(nconf.get('status:INTERNAL_SERVER_ERROR')).json('Fehler im System. Bitte versuche es später noch einmal.');
            }
            await delay(500);
        }

        const sentConfirm = await sendConfirmationEmail({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            movie_id: user.time,
            seat_ids: seat_ids,
            user_id: userId
        })

        if(!sentConfirm) {
            return res.status(nconf.get('status:INTERNAL_SERVER_ERROR')).json('Es konnte keine E-Mail an den Benutzer gesendet werden.');
        }

        res.status(nconf.get('status:OK')).json('Erfolgreich registriert. Du kannst diesen Tab nun schließen.');
    });
}