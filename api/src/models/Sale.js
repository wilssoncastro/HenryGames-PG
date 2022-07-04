const { DataTypes } = require('sequelize');
const { Videogame } = require('../db')

module.exports = (sequelize) => {
    sequelize.define('Sale', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        id_sale: {
            type: DataTypes.UUID,
            /* allowNull: false */
        },
        id_game: {
            type: DataTypes.INTEGER,
            /* allowNull: false */
        },
        id_user: {
            type: DataTypes.UUID,
            /* allowNull: false */
        },
        price: {
            type: DataTypes.FLOAT,
            /* allowNull: false */
        }

    })
}
