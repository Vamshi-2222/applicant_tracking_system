module.exports = (sequelize, DataTypes) => {

    const CompanyName = sequelize.define('CompanyName', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hr_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hr_mobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hr_emal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_detail_description: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        company_description: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        company_response: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company_status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company_addedBy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return CompanyName;

};