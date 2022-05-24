const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');
const User = require('./user');

const AuthToken = sequelize.define('AuthToken',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'token'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at'
    }
},{
    tableName: 'auth_tokens'
});


AuthToken.belongsTo(User, {foreignKey: 'user_id', as: 'users'});

module.exports = AuthToken;