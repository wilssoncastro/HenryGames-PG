const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tags', {
        name:{
            type: DataTypes.STRING
        } 
    }, {timestamps: false})
}