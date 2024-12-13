const { Token, User } = require('../models/models')
const tokenService = require('./token_service')
const userdto = require('../dto/userDTO')
const mailService = require('./mail_service')
const { v4 } = require('uuid')
const bcrypt = require('bcrypt')
const ApiError = require('../apiError/api_error')

class userService {
    async registration(useremail, password) {
        const potentialUser = await User.findOne({ where: { email: useremail } })
        if (potentialUser) {
            throw ApiError.BadRequest(`Пользователь с почтой ${useremail} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = v4()
        const newUser = await User.create({ email: useremail, password: hashPassword, activationLink })
        await mailService.sendActivationLink(useremail, `${process.env.BASE_URL}/server/activate/${activationLink}`)
        const dto = new userdto(newUser)

        const token = await tokenService.createToken({ ...dto })
        await tokenService.saveToken(dto.id, token.refreshToken)

        return { ...token, user: dto }
    }

    async activate(activationLink) {
        const user = await User.findOne({ where: { activationLink: activationLink } })
        if (!user) {
            throw new Error('Пользователь не найден')
        }
        user.isActive = true
        await user.save()
    }
}

module.exports = new userService()