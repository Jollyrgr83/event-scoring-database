var connection = require("../config/connection.js");

var orm = {
    selectAllYear: (year, cb) => {
        var queryString = `SELECT events.id, events.event_name, events.tier_id, events.year, tiers.tier_name FROM events INNER JOIN tiers ON (events.tier_id = tiers.id) WHERE events.year = ${year};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectAllTiers: (cb) => {
        var queryString = `SELECT * FROM tiers;`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;