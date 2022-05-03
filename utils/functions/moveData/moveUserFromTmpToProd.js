const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");


module.exports.moveUserFromTmpToProd = async ({
    firstname,
    lastname,
    email,
    personNumber,
    time,
    userId
}) => {

    return await database.query(`
    INSERT INTO ${tables.tables.reservations} (firstname, lastname, email, personNumber, time, user_id) VALUES (?, ?, ?, ?, ?, ?);
    DELETE FROM ${tables.tables.tmp_user} WHERE email = ?;
    `, [firstname, lastname, email, personNumber, time, userId, email])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        });

}