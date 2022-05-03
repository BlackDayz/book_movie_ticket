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
            res.status(nconf.get('status:BAD_REQUEST'))
        }

        //! VALIDATE INPUT
        if(!validator.isEmail(email) || !validator.isInt(time) || !validator.isInt(personNumber, {min: 1, max: 10})) {
            res.status(nconf.get('status:BAD_REQUEST'))
        }

        const reserveTicketsResult = await reserveTickets({
            firstname: firstName,
            lastname: lastName,
            email: email,
            personNumber: personNumber,
            time: time,
        })

        res.redirect('/loading');

        console.log(reserveTicketsResult || 'Kein return');
    });
}