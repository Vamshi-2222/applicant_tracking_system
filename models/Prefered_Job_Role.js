module.exports = (sequelize, DataTypes) => {

    const PreferedJobRole = sequelize.define('PreferedJobRole', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        JobRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        JobTitle: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return PreferedJobRole;
};