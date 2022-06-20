const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tag', {
        name:{
            type: DataTypes.STRING
        } 
    }, {timestamps: false})
}