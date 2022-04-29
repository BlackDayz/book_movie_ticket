const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.getEmail_Email = async ({
    email
}) => {
    return await database.query(`SELECT email FROM ${tables.tables.reservations} WHERE email = ? LIMIT 1`, [email])
        .then(async res => {
            if (res.length === 0) {
                return false;
            } else {
                return res[0].email;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getEmail_UserId = async ({
    user_id
}) => {
    return await database.query(`SELECT email FROM ${tables.tables.reservations} WHERE user_id = ? LIMIT 1`, [user_id])
        .then(async res => {
            if (res.length === 0) {
                return false;
            } else {
                return res[0].email;
            }
        })
        .catch(err => {
            console.log(err);
        })
}


/**
 * 
 * @param {string} firstName @required
 * @param {string} lastName @required
 * @returns Boolean|String
 */
module.exports.getEmail_Name = async ({
    firstname,
    lastname
}) => {
    return await database.query(`SELECT email FROM ${tables.tables.reservations} WHERE firstname = ? AND lastname = ? LIMIT 1`, [firstname, lastname])
        .then(async res => {
            if (res.length === 0) {
                return false;
            } else {
                return res[0].email;
            }
        })
        .catch(err => {
            console.log(err);
        })
}