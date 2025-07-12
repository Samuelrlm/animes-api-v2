const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorites = sequelize.define('Favorites', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    animeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Animes',
            key: 'id'
        }  
    }
})

module.exports = Favorites;