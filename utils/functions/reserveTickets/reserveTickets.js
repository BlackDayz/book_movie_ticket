const { getEmail_Email } = require("../getData/getEmail");
const config = require('../../../src/json/config/config.json');
const { getFreeSeats } = require("../getData/getFreeSeats");
const { removeFreeSeats } = require("../updateData/removeFreeSeats");
const { addFreeSeats } = require("../updateData/addFreeSeats");
const { insertUserToTmpDatabase } = require("../insertData/insertUserToTmpDatabase");
const { generateVerificationId } = require("../generateData/generateVerificationId");
const { sendVerificationEmail } = require("../sendEmail/sendEmail");

module.exports.reserveTickets = async ({firstname, lastname, email, personNumber, time}) => {

    const user = await getEmail_Email({
        email: email
    });

    if(user) {
        return {
            message: "Email already exists",
            status: config.status.FOUND
        };
    }

    const free_seats = await getFreeSeats({
        movie_id: time
    });

    if(!free_seats) {
        return {
            message: "Es sind keine Sitzplätze mehr frei. Bitte versuchen Sie es später noch einmal oder schauen Sie sich den Film auf Youtube an.",
            status: config.status.NO_CONTENT
        }
    }

    if(free_seats < personNumber) {
        return {
            message: "Es sind nicht genug Sitzplätze frei. Versuche es mit weniger erneut.",
            status: config.status.NO_CONTENT
        }
    }

    const removedFreeSeats = await removeFreeSeats({
        movie_id: time,
        personNumber: personNumber
    });

    if(!removedFreeSeats) {
        return {
            message: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
            status: config.status.BAD_REQUEST
        }
    }

    const verification_id = generateVerificationId();

    const insertUserTmp = insertUserToTmpDatabase({
        firstname: firstname,
        lastname: lastname,
        email: email,
        personNumber: personNumber,
        time: time,
        verification_id: verification_id
    });

    if(!insertUserTmp) {
        await addFreeSeats({
            movie_id: time,
            personNumber: personNumber
        });
        return {
            message: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
            status: config.status.BAD_REQUEST
        }
    }

    const sentVerification = await sendVerificationEmail({
        firstname: firstname,
        lastname: lastname,
        email: email,
        verification_id: verification_id
    });

    if(!sentVerification) {
        return {
            message: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
            status: config.status.BAD_REQUEST
        }
    }else {
        return {
            message: "Ihre Reservierung wurde erfolgreich abgeschickt. Sie erhalten eine Email mit einem Link, um Ihre Reservierung zu bestätigen.",
            status: config.status.OK
        }
    }


}