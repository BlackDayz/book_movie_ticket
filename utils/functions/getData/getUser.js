const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");


module.exports.getUserTmp_Token = async ({
    token
}) => {
    return await database.query(`SELECT * FROM ${tables.tables.tmp_user} WHERE verification_id = ? LIMIT 1`, [token])
        .then(res => {
            if (res.length === 0) {
                return false;
            } else {
                return res[0];
            }
        })
        .catch(err => {
            console.error(err);
            return false;
        })
}