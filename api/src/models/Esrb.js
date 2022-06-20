const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('esrb', {
        name:{
            type: DataTypes.ENUM(
                {values: ["Everyone", "Everyone 10+", "Teen", "Mature", "Adults Only", "Rating Pending"]
            })
        }
    }, {timestamps: false})
}