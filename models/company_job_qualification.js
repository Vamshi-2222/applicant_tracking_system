module.exports = (sequelize, DataTypes, constValue) => {

    const CompanyJobQualification = sequelize.define('CompanyJobQualification', {

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true

            },
            qualification: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            timestamps: false,
        }

    );

    return CompanyJobQualification;
};