module.exports = (sequelize, DataTypes, constValue) => {

    const CompanyJob = sequelize.define('CompanyJob', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pseudoName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jobLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cabFacility: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        eligibility: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        documents: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        salary: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        experience: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        jobDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: constValue.STATUS.ACTIVE
        }

    });

    return CompanyJob;
};