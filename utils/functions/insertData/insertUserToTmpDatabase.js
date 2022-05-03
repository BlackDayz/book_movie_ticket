const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.insertUserToTmpDatabase = async ({firstname, lastname, email, personNumber, time, verification_id}) => {

    return await database.query(`INSERT INTO ${tables.tables.tmp_user} (firstname, lastname, email, personNumber, time, verification_id) VALUES (?, ?, ?, ?, ?, ?)`, [firstname, lastname, email, personNumber, time, verification_id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        })

}