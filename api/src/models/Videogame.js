const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('videogame',{
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        on_sale:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        free_to_play:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {timestamps: false})
}