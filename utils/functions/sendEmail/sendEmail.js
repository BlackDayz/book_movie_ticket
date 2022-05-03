const nodemailer = require('nodemailer');
const { generateEmailHtml } = require('../../email/generateEmailHtml');
const nconf = require('nconf');

const transporter = nodemailer.createTransport({
  port: nconf.get('email:port'),
  host: nconf.get('email:host'),
  secure: nconf.get('email:secure'),
  auth: {
      user: nconf.get('email:auth:user'),
      pass: nconf.get('email:auth:pass')
  }
});

module.exports.sendVerificationEmail = async ({firstname, lastname, email, verification_id}) => {
      var message = {
        from: nconf.get('email:email'),
        to: email,
        subject: 'E-Mail Verifizierung für gruenes-feuer.de',
        html: await generateEmailHtml({
            firstname: firstname,
            lastname: lastname,
            verification_id: verification_id,
            isConfirmed: false,
            movie_id: null,
            seatIds: null,
        })
      };
      let sent = true;
      transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
            sent = false;
        }else {
          console.log('Message sent: %s', info.messageId);
        }
      });
      return sent;
}


module.exports.sendConfirmationEmail = async ({firstname, lastname, email, movie_id, seat_ids, user_id}) => {
  var message = {
    from: nconf.get('email:email'),
    to: email,
    subject: 'Erfolgreich reserviert!',
    html: await generateEmailHtml({
        firstname: firstname,
        lastname: lastname,
        verification_id: user_id,
        isConfirmed: true,
        movie_id: movie_id,
        seatIds: seat_ids,
    })
  };
  let sent = true
  transporter.sendMail(message, (error, info) => {
    if (error) {
        sent = false;
        return console.log(error);
    }else {
      console.log('Message sent: %s', info.messageId);
    }
  });

  return sent;
};