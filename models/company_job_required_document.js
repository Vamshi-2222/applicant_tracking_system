module.exports = (sequelize, DataTypes, constValue) => {

    const CompanyJobRequiredDocument = sequelize.define('CompanyJobRequiredDocument', {

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

    return CompanyJobRequiredDocument;
};