module.exports = (sequelize, DataTypes) => {

    const Upload = sequelize.define('Upload', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fileType: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        filePath: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

    });

    return Upload;

};