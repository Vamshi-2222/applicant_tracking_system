module.exports = (sequelize, DataTypes) => {

    const GraduationCourse = sequelize.define('GraduationCourse', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        course: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return GraduationCourse;
};