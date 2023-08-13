const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'professionalidrissi@gmail.com',
      pass: 'gkhytpzgeqvlbbdt'
    }
  });

async function sendMail(myMail,body){
      const options = {
        from: myMail,
        to: myMail,
        subject: "New Command !",
        html:body
      };
      try {
        let info = await transporter.sendMail(options);
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
  sendMail
}