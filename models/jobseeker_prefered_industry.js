module.exports = (sequelize, DataTypes) => {

    const JobSeekerPreferedIndustry = sequelize.define('JobSeekerPreferedIndustry', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        preferedIndustry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferedJobRole: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return JobSeekerPreferedIndustry;
};