const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {User} = require('./user_model')

const Token = sequelize.define('token', {
    userID: {type: DataTypes.UUID, references:{model: 'User', key: 'id'}},
    refresh: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {Token}