module.exports = (sequelize, DataTypes) => {

    const Language = sequelize.define('Language', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        LanguageTitle: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Language;
};