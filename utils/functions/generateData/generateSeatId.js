const { isSeatIdFree } = require("../getData/getSeatId");


module.exports.generateSeatId = async () => {
    async function generate() {
        let id = Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
        const isIdFree = await isSeatIdFree({
            seat_id: id
        });

        if(!isIdFree) {
            return generate();
        }else {
            return id;
        }
    }
    return await generate();
}