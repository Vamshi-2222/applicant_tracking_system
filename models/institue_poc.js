module.exports = (sequelize, DataTypes) => {

    const PocInstitute = sequelize.define('PocInstitute', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        pocName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });

    return PocInstitute;

};