const {Token, User} = require('../models/models')
const userService = require('../service/user_service')

class userController {
    async registration(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            return res.json(userData)
        } catch (error) {

            return res.json('Сервер завершился с ошибкой:'+error)
        }
    }   
    async login(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }   
    async logout(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }   
    async activate(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }   
    async refresh(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }   
    async getUsers(req, res, next){
        try {
            res.json(['123', 'dsf'])
        } catch (error) {
            
        }
    }   
}

module.exports = new userController()   