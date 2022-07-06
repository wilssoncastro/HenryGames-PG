const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('LibraryPlayer', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        code: {
            type: DataTypes.STRING
        }
    },{timestamps: false})
}