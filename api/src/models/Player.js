const { timeStamp } = require('console');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('player', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.DATE,
        },
        phone: {
            type: DataTypes.BIGINT
        },
        adress: {
            type: DataTypes.STRING
        },
        isDeveloper: {
            type: DataTypes.BOOLEAN
        },
        // friends:{
        //     type: DataTypes.ARRAY(DataTypes.BIGINT)
        // }

<<<<<<< HEAD
    },{timeStamps:false})
=======
    },{timestamps:false})
>>>>>>> nicogon
}