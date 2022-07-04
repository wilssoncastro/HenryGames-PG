const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Article', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            
        },
        contents: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        }
    })
}