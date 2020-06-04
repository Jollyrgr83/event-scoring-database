var orm = require("../config/orm.js");

var model = {
    getAllFromOneTable: (tableName, cb) => {
        orm.selectAllFromOneTable(tableName, (res) => {
            cb(res);
        });
    },
    getAllCompetitorsByYear: (year, cb) => {
        orm.selectAllCompetitorsByYear(year, (res) => {
            cb(res);
        });
    },
    getOneCompetitorByID: (competitor_id, cb) => {
        orm.selectOneCompetitorByID(competitor_id, (res) => {
            cb(res);
        });
    },
    getTeamBooleanByTierID: (tier_id, cb) => {
        orm.selectTeamBooleanByTierID(tier_id, (res) => {
            cb(res);
        });
    },
    getAllTiersByYearID: (year_id, cb) => {
        orm.selectAllTiersByYearID(year_id, (res) => {
            cb(res);
        });
    },
    addView: (body, cb) => {
        orm.addOneView(body, (res) => {
            cb(res);
        });
    },
    addEventYear: (body, cb) => {
        orm.addOneEventYear(body, (res) => {
            cb(res);
        });
    },
    addTierYear: (body, cb) => {
        orm.addOneTierYear(body, (res) => {
            cb(res);
        });
    },
    updateView: (body, cb) => {
        orm.updateOneView(body, (res) => {
            cb(res);
        });
    },
    deleteView: (body, cb) => {
        orm.deleteOneView(body, (res) => {
            cb(res);
        });
    },
    deleteYear: (event_id, tier_id, year_id, cb) => {
        orm.deleteOneYear(event_id, tier_id, year_id, (res) => {
            cb(res);
        });
    },
    deleteYearTier: (body, cb) => {
        orm.deleteYearTier(body, (res) => {
            cb(res);
        });
    },
    updateComp: (body, cb) => {
        orm.updateOneCompetitor(body, (res) => {
            cb(res);
        });
    },
    deleteComp: (body, cb) => {
        orm.deleteOneCompetitor(body, (res) => {
            cb(res);
        });
    },
    addOneComp: (body, cb) => {
        orm.addOneCompetitor(body, (res) => {
            cb(res);
        });
    },
    getCompScores: (compID, yearID, cb) => {
        orm.getCompetitorScores(compID, yearID, (res) => {
            cb(res);
        });
    },
    updateScores: (arr, cb) => {
        orm.updateCompetitorScores(arr, (res) => {
            cb(res);
        });
    },
    scoreReconciliation: (year_id, competitor_id, cb) => {
        orm.scoreReconciliation(year_id, competitor_id, (res) => {
            cb(res);
        });
    }
};

module.exports = model;