const nconf = require('nconf');
const validator = require('validator');
const database = require('../../db/db');

const tables = require('../../db/table.json');

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
        email = validator.isEmail(email);
        time = validator.isInt(time);
        personNumber = validator.isInt(personNumber, {min: 1, max: 10});

        if(!firstName || !lastName || !email || !personNumber || !time) {
            res.status(nconf.get('status:BAD_REQUEST'))
        }


        database.query(`SELECT email FROM ${tables.tables.reservations} WHERE email = ?`, [email])
            .then(async res => {

            })
            .catch(err => {
                
            })

    });
}