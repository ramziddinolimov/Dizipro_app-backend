const nodemailer = require("nodemailer");

async function sendEmail(mailTo, html) {
	const testAccount = await nodemailer.createTestAccount();

	const transport = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	let info = await transport.sendMail({
		from: `"Dizipro" <${process.env.MAIL_ADDRESS}>`, // sender address
		to: mailTo, // list of receivers
		subject: "Confirm recovery password ✔", // Subject line
		html, // html body
	});

	return info;
}

module.exports = sendEmail;