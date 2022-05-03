const nconf = require('nconf');
const validator = require('validator');
const { reserveTickets } = require('../../../utils/functions/reserveTickets/reserveTickets');

module.exports = (app, parser) => {
    app.post(nconf.get('routing:mainRoute')+nconf.get('routing:reserveTicket'), parser, async (req, res) => {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = validator.normalizeEmail(req.body.email, {all_lowercase: true});
        var personNumber = req.body.personNumber;
        var time = req.body.time;
        //! SANITIZERS INPUT
        firstName = validator.escape(firstName);
        lastName = validator.escape(lastName);


        if(!firstName || !lastName) {
            return res.status(nconf.get('status:BAD_REQUEST')).json('Missing firstname or lastname');
        }

        //! VALIDATE INPUT
        if(!validator.isEmail(email) || !validator.isInt(time) || !validator.isInt(personNumber, {min: 1, max: 10})) {
            return res.status(nconf.get('status:BAD_REQUEST')).json('Invalid input');
        }

        const reserveTicketsResult = await reserveTickets({
            firstname: firstName,
            lastname: lastName,
            email: email,
            personNumber: personNumber,
            time: time,
        })

        //send status code and message to frontend
        return res.status(reserveTicketsResult.status).json(reserveTicketsResult.message);
    });
}