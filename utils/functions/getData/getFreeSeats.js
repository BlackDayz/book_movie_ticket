const database = require("../../../server/db/db");
const tables = require("../../../server/db/table.json");

module.exports.getFreeSeats = async ({movie_id}) => {
    console.log(movie_id)
    return await database.query(`SELECT * FROM ${tables.tables.seats} WHERE movie_id = ? LIMIT 1`, [movie_id])
        .then(res => {
            console.log(res)
            const free_seats = res[0].free_seats;
            
            return (free_seats > 0) ? free_seats : false;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
}