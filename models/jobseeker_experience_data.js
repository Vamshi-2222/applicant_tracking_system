module.exports = (sequelize, DataTypes) => {

    const JobseekerExperienceData = sequelize.define('JobseekerExperienceData', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        preferedJobType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        preferedShift: {
            type: DataTypes.STRING,
            allowNull: true
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addedBy: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return JobseekerExperienceData;
};