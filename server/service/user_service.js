const {Token, User} = require('../models/models')
const mailService = require('./mail_service')
const {v4} = require('uuid')
const bcrypt = require('bcrypt')

class userService {
    async registration(email, password){
        const potentialUser = await User.findOne(email)
        if(potentialUser){
            throw new Error(`Пользователь с почтой ${email} уже существует`)
        }
        const hashPassword =  await bcrypt.hash(password, 5)
        const activationLink = v4()
        const newUser = await User.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationLink(email, activationLink)
    }
}

module.exports = new userService()