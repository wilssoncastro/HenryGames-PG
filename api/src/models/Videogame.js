const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('videogame', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
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
        on_sale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        free_to_play: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        short_screenshots: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            defaultValue: ["Has no screenShots"]
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: ["Has no Tags"]
        },
        esrb_rating: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Rating Pending"
        },
        requirements: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            defaultValue: ["Has no requirements"]
        },
        db_created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        contador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { timestamps: false })
}