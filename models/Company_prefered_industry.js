module.exports = (sequelize, DataTypes) => {

    const CompanyPreferedIndustry = sequelize.define('CompanyPreferedIndustry', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        IndustryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return CompanyPreferedIndustry;
};