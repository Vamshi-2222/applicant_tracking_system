// @ts-nocheck
const env = require("../util/env.js");
const constValue = require("../util/constant.js");

const Sequelize = require("sequelize");
const {
  Op
} = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    multipleStatements: true,
  },
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.userType = require("../models/user_types")(sequelize, Sequelize);
db.companyName = require("../models/company_registration")(
  sequelize,
  Sequelize
);
db.companyJob = require("../models/company_job")(
  sequelize,
  Sequelize,
  constValue
);
db.companyJobQualification = require("../models/company_job_qualification")(
  sequelize,
  Sequelize
);
db.companyJobRequiredDocument = require("../models/company_job_required_document")(
  sequelize,
  Sequelize
);

db.institute = require("../models/institute")(sequelize, Sequelize);

db.institutePoc = require("../models/institue_poc")(sequelize, Sequelize);


db.jobSeekerEnrollment = require("../models/jobseeker_Enrollment_Personal_Data")(
  sequelize,
  Sequelize
);
db.jobSeekerEducationEnrollment = require("../models/jobseeker_Enrollment_Educational_data")(
  sequelize,
  Sequelize
);
db.jobSeekerPreferedSkillset = require("../models/jobseeker_Enrollment_skillset")(
  sequelize,
  Sequelize
);
db.jobSeekerPreferedCertificate = require("../models/jobseeker_Enrollment_certification_data")(
  sequelize,
  Sequelize
);
db.jobSeekerPreferedLocation = require("../models/jobseeker_Enrollment_Prefered_Location")(
  sequelize,
  Sequelize
);
db.jobSeekerExperienceData = require("../models/jobseeker_experience_data")(
  sequelize,
  Sequelize
);
db.jobSeekerCompanyData = require("../models/jobseeker_company_data")(
  sequelize,
  Sequelize
);
db.jobSeekerPreferedIndustry = require("../models/jobseeker_prefered_industry")(
  sequelize,
  Sequelize
);
db.jobSeekerLeveloneAssesssment = require("../models/jobseeker_levelone_assesment")(
  sequelize,
  Sequelize
);
db.jobSeekerLeveltwoAssesssment = require("../models/jobseeker_leveltwo_assessment")(
  sequelize,
  Sequelize
);
db.jobSeekerLeveltwoExpandedAssesssment = require("../models/jobseeker_leveltwo_expandlevel")(
  sequelize,
  Sequelize
);
db.jobSeekerLevelFinalAssesssment = require("../models/jobseeker_final_assessment")(
  sequelize,
  Sequelize
);
db.assignCandidate = require("../models/assignTask")(sequelize, Sequelize);
db.locationCityData = require("../models/location_city_data")(
  sequelize,
  Sequelize
);
db.companyPreferedIndustry = require("../models/Company_prefered_industry")(
  sequelize,
  Sequelize
);
db.preferedJobRole = require("../models/Prefered_Job_Role")(
  sequelize,
  Sequelize
);
db.graduationCourse = require("../models/graduation_course")(
  sequelize,
  Sequelize
);
db.postGraduationCourse = require("../models/postGraduation_course")(
  sequelize,
  Sequelize
);

db.job_language = require("../models/job_seeker_prefer_language")(sequelize, Sequelize);
db.jobSeekerLanguage = require("../models/language")(sequelize, Sequelize);
db.employeeRegistration = require("../models/employeeRegistration")(
  sequelize,
  Sequelize
);
db.password = require("../models/password")(sequelize, Sequelize);
db.jobseekerpassword = require("../models/jobseeker_password")(
  sequelize,
  Sequelize
);
db.managerCount = require("../models/managerCount")(sequelize, Sequelize);

db.supervisiorCount = require("../models/supervisiorCount")(
  sequelize,
  Sequelize
);

db.teamLeadCount = require("../models/teamLeadCount")(sequelize, Sequelize);

db.upload = require("../models/uploadFile")(sequelize, Sequelize);


db.password.belongsTo(db.employeeRegistration, {
  foreignKey: {
    name: "employeeId",
    allowNull: false,
  },
});

db.jobSeekerPreferedLocation.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "candidateId",
    allowNull: true,

  },
});

db.jobSeekerEnrollment.hasMany(db.jobSeekerPreferedLocation, {
  foreignKey: "candidateId",
});

db.job_language.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "langugeId"
  },
})

db.jobSeekerEnrollment.hasMany(db.job_language, {
  foreignKey: "langugeId"
}); 

db.employeeRegistration.hasOne(db.password, {
  foreignKey: "employeeId",
});

db.managerCount.belongsTo(db.employeeRegistration, {
  foreignKey: {
    name: "managersId",
    allowNull: true,
  },
});

db.employeeRegistration.hasMany(db.managerCount, {
  foreignKey: "managersId",
});

db.teamLeadCount.belongsTo(db.employeeRegistration, {
  foreignKey: {
    name: "teamLeadsId",
    allowNull: true,
  },
});

db.employeeRegistration.hasMany(db.teamLeadCount, {
  foreignKey: "teamLeadsId",
});

db.supervisiorCount.belongsTo(db.employeeRegistration, {
  foreignKey: {
    name: "supervisiorsId",
    allowNull: true,
  },
});

db.employeeRegistration.hasMany(db.supervisiorCount, {
  foreignKey: "supervisiorsId",
});


db.jobseekerpassword.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "candidateId",
    allowNull: true,
    
  },
});

db.jobSeekerEnrollment.hasOne(db.jobseekerpassword, {
  foreignKey: "candidateId",
});

db.companyJob.belongsTo(db.companyName, {
  foreignKey: {
    name: "companyId",
    allowNull: true,
  },
});

db.companyName.hasMany(db.companyJob, {
  foreignKey: {
    name: "companyId"
  },
});

db.companyJobQualification.belongsTo(db.companyJob, {
  foreignKey: "companyId",
});

// db.companyJobRequiredDocument.belongsTo(db.companyJob, {
//   foreignKey: {
//     name: "companyId",
//     allowNull: true,
//   },
// });

db.companyJob.hasMany(db.companyJobQualification, {
  foreignKey: "companyId",
});

// db.companyJob.hasMany(db.companyJobRequiredDocument, {
//   foreignKey: "companyId",
// });



db.jobSeekerEducationEnrollment.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "candidateId",
    allowNull: true , 
  },
  
});

db.jobSeekerEnrollment.hasOne(db.jobSeekerEducationEnrollment, {
  foreignKey: "candidateId",
});

db.jobSeekerExperienceData.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "candidateId",
    allowNull: true,
  },
});

db.jobSeekerEnrollment.hasOne(db.jobSeekerExperienceData, {
  foreignKey: "candidateId",  
});

db.jobSeekerPreferedSkillset.belongsTo(db.jobSeekerEducationEnrollment, {
  foreignKey: {
    name: "candidateId",
    allowNull: true,
  },
});

db.jobSeekerEducationEnrollment.hasMany(db.jobSeekerPreferedSkillset, {
  foreignKey: "candidateId", 
});

db.jobSeekerPreferedCertificate.belongsTo(db.jobSeekerEducationEnrollment, {
  foreignKey: {
    name: "candidateId",
    allowNull: true, 
  },
});

db.jobSeekerEducationEnrollment.hasMany(db.jobSeekerPreferedCertificate, {
  foreignKey: "candidateId",
});

db.jobSeekerCompanyData.belongsTo(db.jobSeekerExperienceData, {
  foreignKey: {
    name: "candidateId",
    allowNull: true,   
  },
});

db.jobSeekerExperienceData.hasMany(db.jobSeekerCompanyData, {
  foreignKey: "candidateId", 
});

db.jobSeekerPreferedIndustry.belongsTo(db.jobSeekerExperienceData, {
  foreignKey: {
    name: "candidateId",
    allowNull: true,    
  },
});

db.jobSeekerExperienceData.hasMany(db.jobSeekerPreferedIndustry, {
  foreignKey: "candidateId",  
});

db.jobSeekerLeveloneAssesssment.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "levelOneId",
    allowNull: true,
  },
});

db.jobSeekerEnrollment.hasOne(db.jobSeekerLeveloneAssesssment, {
  foreignKey: "levelOneId",  
});

db.jobSeekerLeveltwoExpandedAssesssment.belongsTo(db.jobSeekerEnrollment, {
  foreignKey: {
    name: "leveltwoId",
    allowNull: true,    
  },
});

db.jobSeekerEnrollment.hasMany(db.jobSeekerLeveltwoExpandedAssesssment, {
  foreignKey: "leveltwoId",  
});

db.jobSeekerLevelFinalAssesssment.belongsTo(
  db.jobSeekerLeveltwoExpandedAssesssment, {
    foreignKey: {
      name: "FinalAssessmentId",
      allowNull: true,
    },
  }
);

db.jobSeekerLeveltwoExpandedAssesssment.hasOne(
  db.jobSeekerLevelFinalAssesssment, {
    foreignKey: "FinalAssessmentId"
  }
);

db.institutePoc.belongsTo(db.institute, {
  foreignKey: {
    name: 'instituteId',
    allowNull: false
  }  
});

db.institute.hasMany(db.institutePoc, {
  foreignKey: 'instituteId'
}); 

module.exports = db;