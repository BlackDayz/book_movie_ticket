const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.getEmail_Email = async ({
    email
}) => {
    return await database.query(`SELECT email FROM ${tables.tables.reservations} WHERE email = ? LIMIT 1; SELECT email FROM ${tables.tables.tmp_user} WHERE email = ? LIMIT 1`, [email, email])
        .then(async res => {
            if (res[0].length === 0 && res[1].length === 0) {
                return false;
            } else {
                if(res[0].length > 0) {
                    return res[0][0].email;
                } else {
                    return res[1][0].email;
                }
            }
        })
        .catch(err => {
            console.log(err);
            return true;
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
            return true;
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