module.exports = (sequelize, DataTypes) => {

    const JobSeekerEnrollmentEducationalData = sequelize.define('JobSeekerEnrollmentEducationalData', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        highscool: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        highscoolDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        Intermediate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        IntermediateDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        graduation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        graduationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        postGraduation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postGraduationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        typingSpeed: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });

    return JobSeekerEnrollmentEducationalData;

};