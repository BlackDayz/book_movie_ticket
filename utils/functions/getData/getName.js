const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.getName_Email = async ({
    email
}) => {
    return await database.query(`SELECT firstname, lastname FROM ${tables.tables.reservations} WHERE email = ? LIMIT 1`, [email])
        .then(async res => {
            if (res.length === 0) {
                return false;
            } else {
                return {
                    firstname: res[0].firstname,
                    lastname: res[0].lastname
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getName_UserId = async ({
    user_id
}) => {
    return await database.query(`SELECT firstname, lastname FROM ${tables.tables.reservations} WHERE user_id = ? LIMIT 1`, [user_id])
        .then(async res => {
            if (res.length === 0) {
                return false;
            } else {
                return {
                    firstname: res[0].firstname,
                    lastname: res[0].lastname
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
}