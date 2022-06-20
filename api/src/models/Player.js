const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('player',{
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
        },
        telefono: {
            type: DataTypes.BIGINT
        },
        direccion: {
            type: DataTypes.STRING
        },
        isDeveloper:{
            type: DataTypes.BOOLEAN
        },
        // amigos:{
        //     type: DataTypes.ARRAY(DataTypes.BIGINT)
        // }

    })
}