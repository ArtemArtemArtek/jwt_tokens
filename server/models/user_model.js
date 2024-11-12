const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    isActive:{type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
})

const Token = sequelize.define('token', {
    userID: {type: DataTypes.UUID, references:{model: 'user', key: 'id'}},
    refresh: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {User, Token}