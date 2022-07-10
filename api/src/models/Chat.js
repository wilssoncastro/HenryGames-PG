const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Chat', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        id_user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        idF: {
            type: DataTypes.UUID,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        
        
    })
}