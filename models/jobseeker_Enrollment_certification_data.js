module.exports = (sequelize, DataTypes) => {

    const JobSeekerEnrollmentCertification = sequelize.define('JobSeekerEnrollmentCertification', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        certificateName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        certificateNumber: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return JobSeekerEnrollmentCertification;
};