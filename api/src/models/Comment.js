const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        id_comment: {
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
        comment: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        reported: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    })
}