const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.isSeatIdFree = async ({seat_id}) => {
    return database.query(`SELECT seat_id FROM ${tables.tables.seats_user} WHERE seat_id = ?`, [seat_id])
        .then(res => {
            if(res.length > 0) {
                return false;
            }else {
                return true;
            }
        })
        .catch(err => {
            console.log(err);
            return 'error';
        })
}