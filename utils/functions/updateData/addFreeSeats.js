const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.addFreeSeats = async ({movie_id, personNumber}) => {
    return await database.query(`UPDATE ${tables.tables.seats} SET free_seats = free_seats + ? WHERE movie_id = ?`, [personNumber, movie_id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        })
}