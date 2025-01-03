module.exports = (sequelize, DataTypes) => {

    const JobSeekerEnrollmentSkillset = sequelize.define('JobSeekerEnrollmentSkillset', {

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true

            },
            skill: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            timestamps: false,
        }

    );

    return JobSeekerEnrollmentSkillset;
};