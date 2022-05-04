const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");


module.exports.deleteDataFromTmp = async ({verification_id}) => {
    return await database.query(`DELETE FROM ${tables.tables.tmp_user} WHERE email = ?;`, [verification_id])
        .then(res => {
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        })
}