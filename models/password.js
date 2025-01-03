module.exports = (sequelize, DataTypes, constValue) => {

    const Password = sequelize.define('password', {

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

    return Password;
};