module.exports = (sequelize, DataTypes) => {

    const InstituteRegistration = sequelize.define("InstituteRegistration", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        instituteName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        timing: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        strength: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        courseOffered: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        internship: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        driveReport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instituteStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        remark: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        }
    });

    return InstituteRegistration;

};