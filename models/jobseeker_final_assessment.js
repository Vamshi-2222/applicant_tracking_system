module.exports = (sequelize, DataTypes) => {

    const JobSeekerLevelFinalAssessment = sequelize.define('JobSeekerLevelFinalAssessment', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        Recruiter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        onBoardingDateStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        onFifteenBoardingDate: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onFifteenStatus: {
            type: DataTypes.STRING,
            defaultValue: 'PENDING'
        }, 
        onThirtyBoardingDate: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onThirtyStatus: {
            type: DataTypes.STRING,
            defaultValue: 'PENDING'
        },
        onFortyfiveBoardingDate: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onFortyfiveStatus: {
            type: DataTypes.STRING,
            defaultValue: 'PENDING'
        },
        onSixtyBoardingDate: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onSixtyStatus: {
            type: DataTypes.STRING,
            defaultValue: 'PENDING'
        },
        onSeventyFiveBoardingDate: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onSeventyFiveStatus: {
            type: DataTypes.STRING,
            defaultValue: 'PENDING'
        },
        onNinetyBoardingDate: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onNinetyStatus: {
            type: DataTypes.STRING,
            defaultValue: 'PENDING'
        },
        onBoardingSelect: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.NOW
        },
        onBoardingRemark: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        EMPID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BilingStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CourierDetail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BillingRemark: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return JobSeekerLevelFinalAssessment;
};