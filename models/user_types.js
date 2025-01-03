module.exports = (sequelize, DataTypes) => {

    const UserType = sequelize.define('userType', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return UserType;

}