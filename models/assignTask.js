module.exports = (sequelize, DataTypes) => {

    const AssignCandidateTable = sequelize.define('AssignCandidateTables', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        AssignBy: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        AssignCandidate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        QuestionerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AssignerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AssessmentStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'PENDING' //or DONE
        }
    });

    return AssignCandidateTable;

};