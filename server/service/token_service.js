const { Token, User } = require('../models/models')
const jwt = require('jsonwebtoken')

class tokenService {
    async createToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' })
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userID, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId: userID } })
        if (tokenData) {
            tokenData.refresh = refreshToken
            return tokenData.save()
        }
        const token = Token.create({ userId: userID, refresh: refreshToken })
        return token
    }

    async deleteToken(refreshToken) {
        const tokenData = await Token.destroy({ where: { refresh: refreshToken } })
        return tokenData
    }

    async findToken(refreshToken) {
        const userData = Token.findOne({ where: { refresh: refreshToken } })
        return userData
    }
    async validationRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
            return userData
        } catch (error) {
            return null
        }
    }

    async validationAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
            return userData
        } catch (error) {
            return null
        }
    }
}

module.exports = new tokenService()