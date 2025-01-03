module.exports = (sequelize, DataTypes) => {

    const LocationCityData = sequelize.define('LocationCityData', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        locationState: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locationCity: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return LocationCityData;
};