const { Token, User } = require('../models/models')
const userService = require('../service/user_service')
// const

class userController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken)
            return res.json(userData)
        } catch (error) {
             next(error)
        }
    }
    async login(req, res, next) {
        try {
            const {mail, password} = req.body
        } catch (error) {
             next(error)
        }
    }
    async logout(req, res, next) {
        try {

        } catch (error) {
             next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.USER_URL)
        } catch (error) {
             next(error)
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (error) {
             next(error)
        }
    }
    async getUsers(req, res, next) {
        try {
            res.json(['123', 'dsf'])
        } catch (error) {
             next(error)
        }
    }
}

module.exports = new userController()   