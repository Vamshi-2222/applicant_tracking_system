module.exports = (sequelize, DataTypes) => {

    const JobSeekerCompanyData = sequelize.define('JobSeekerCompanyData', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyIndustry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyRole: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        Salary: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });

    return JobSeekerCompanyData;

};