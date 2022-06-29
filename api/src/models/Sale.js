const { DataTypes } = require('sequelize');

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
            allowNull: false
        },
        id_game: {
            type: DataTypes.UUID,
            allowNull: false
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
}