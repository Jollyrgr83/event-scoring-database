var orm = require("../config/orm.js");

var model = {
    allTiers: (cb) => {
        orm.selectAllTiers((res) => {
            cb(res);
        });
    },
    allEvents: (cb) => {
        orm.selectAllEvents((res) => {
            cb(res);
        });
    },
    allView: (tableName, cb) => {
        orm.selectAllView(tableName, (res) => {
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
    getYearOptions: (cb) => {
        orm.getAllYear((res) => {
            cb(res);
        });
    },
    getActiveTiers: (year_id, event_id, cb) => {
        orm.getActiveTiers(year_id, event_id, (res) => {
            cb(res);
        });
    }
};

module.exports = model;