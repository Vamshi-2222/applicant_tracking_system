module.exports = (sequelize, DataTypes) => {

    const JobSeekerEnrollmentPerferedLocation = sequelize.define('JobSeekerEnrollmentPerferedLocation', {

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true

            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            timestamps: false,
        }

    );

    return JobSeekerEnrollmentPerferedLocation;
};