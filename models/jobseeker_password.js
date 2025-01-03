module.exports = (sequelize, DataTypes, constValue) => {

    const JobSeekerPassword = sequelize.define('JobSeekerPassword', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return JobSeekerPassword;
};