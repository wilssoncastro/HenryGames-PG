
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
        profile_pic:{
            type: DataTypes.TEXT
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING
        },
        adress: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        secret_token: {
            type: DataTypes.STRING
        },
        banned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, 
            allowNull: false
        },
        
        // friends:{
        //     type: DataTypes.ARRAY(DataTypes.BIGINT)
        // }
        online: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, 
            allowNull: false
        }

    }, {timestamps: true})
}