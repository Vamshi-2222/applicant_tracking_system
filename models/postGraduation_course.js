module.exports = (sequelize, DataTypes) => {

    const PostGraduationCourse = sequelize.define('PostGraduationCourse', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        PGCourse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PGSubject: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return PostGraduationCourse;
};