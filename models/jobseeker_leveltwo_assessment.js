module.exports = (sequelize, DataTypes) => {

    const JobSeekerLevelTwoAssessment = sequelize.define('JobSeekerLevelTwoAssessment', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        Assessment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        takenBy: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return JobSeekerLevelTwoAssessment;
};