const Router = require('express').Router
const router = new Router()
const userController = require('../controllers/user_controller')
const authMidleware = require('../midlewares/auth-midleware')
const body = require('express-validator').body

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMidleware, userController.getUsers)

module.exports = router

