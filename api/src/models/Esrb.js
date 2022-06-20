const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('esrb', {
        name:{
            type: DataTypes.STRING
        }
    }, {timestamps: false})
}