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

    async login(useremail, password) {
        const potentialUser = await User.findOne({ where: { email: useremail } })
        if (!potentialUser) {
            throw ApiError.Unauthorized()
        }
        const isPassEquals = await bcrypt.compare(password, potentialUser.password);
        if (isPassEquals) {
            const dto = new userdto(potentialUser)
            const token = await tokenService.createToken({ ...dto })
            await tokenService.saveToken(dto.id, token.refreshToken)
            return { ...token, user: dto }
        } else {
            throw ApiError.BadRequest('Пользователь ввел неверный пароль')
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.deleteToken(refreshToken)
        return (token)
    }


    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }
        const userData = tokenService.validationRefreshToken(refreshToken)
        const DBtoken = tokenService.findToken(refreshToken)
        if (!userData || !DBtoken) {
            throw ApiError.Unauthorized()
        }
        const user = await User.findOne({ where: { id: userData.id } })
        const userDto = new userdto(user);
        const tokens = tokenService.createToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async getUsers() {
        const users = User.findAll()
        return users
    }
}

module.exports = new userService()