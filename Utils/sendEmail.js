var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testconectd@gmail.com',
    pass: 'conectd@123'
  }
});
const senderEmail = transporter.options.auth.user || ""


const sendEmailToUser = (email) => {
  var mailOptions = {
    from: senderEmail,
    to: email,
    subject: "Test Mail",
    html: ` <div style="width:80%;margin:auto;border:1px solid #000">
            <h1>This is test mail</h1>
      </div>
   `
  };
  genericSendMail(mailOptions);
};


function genericSendMail(mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error + 'testing');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendEmailToUser
}