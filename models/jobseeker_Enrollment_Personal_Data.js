module.exports = (sequelize, DataTypes) => {

    const JobSeekerEnrollmentPersonalData = sequelize.define('JobSeekerEnrollmentPersonalData', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        datatype: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'INTERNAL'
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        CandidateID: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phoneNumberOne: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumberTwo: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        phoneNumberthree: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        phoneNumberfour: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        emailOne: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        emailTwo: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        emailThree: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        emailFour: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        homeTown: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currentLocation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        employeeName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: 'ADMIN'
        },
        empID: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '1'
        },
    });

    return JobSeekerEnrollmentPersonalData;

};