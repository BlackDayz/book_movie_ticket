const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.insertDataInSeatsUser = async ({
    movie_id,
    email,
    seat_id
}) => {
    return database.query(`INSERT INTO ${tables.tables.seats_user} (movie_id, email, seat_id) VALUES (?, ?, ?)`, [movie_id, email, seat_id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        })
}