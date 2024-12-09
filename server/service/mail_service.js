const { Token, User } = require('../models/models')
const nodemailer = require('nodemailer')

class mailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }

        })
    }
    async sendActivationLink(mail, activationLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: mail,
            text: '',
            html:
                `
            <h1>Ссыдка для активации акаунта на сервисе ${process.env.BASE_URL}</h1>
            <a href='${activationLink}'>${activationLink}</a>
            `
        })
    }
}

module.exports = new mailService()