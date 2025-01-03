module.exports = (sequelize, DataTypes) => {

    const JobSeekerLevelOneAssessment = sequelize.define('JobSeekerLevelOneAssessment', {

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
        client: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        process: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        interview: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        questionerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        takenBy: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return JobSeekerLevelOneAssessment;
};