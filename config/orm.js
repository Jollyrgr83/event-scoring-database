var connection = require("../config/connection.js");

var orm = {
    selectAllTiers: (cb) => {
        var queryString = `SELECT * FROM tiers;`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectAllEvents: (cb) => {
        var queryString = `SELECT * FROM events;`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectAllView: (tableName, cb) => {
        var queryString = `SELECT * FROM ${tableName};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addOneView: (body, cb) => {
        if (body.titleName === "Years") {
            var queryString = `INSERT INTO ${body.titleName.toLowerCase()} (type, value) VALUES ("year", ${parseInt(body.itemName)});`;
        }
        else if (body.titleName === "Tiers") {
            var queryString = `INSERT INTO ${body.titleName.toLowerCase()} (name, team) VALUES ('${body.itemName}', ${body.teamStatus});`;
        }
        else if (body.titleName === "Organizations") {
            var queryString = `INSERT INTO ${body.titleName.toLowerCase()} (name, coop) VALUES ('${body.itemName}', ${body.coopStatus});`;
        }
        else {
            var queryString = `INSERT INTO ${body.titleName.toLowerCase()} (name) VALUES ('${body.itemName}');`;
        }
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addOneEventYear: (body, cb) => {
        var queryString = `INSERT INTO years (tier_id, event_id, year_id, type) VALUES (${body.tier_id}, ${body.event_id}, ${body.year_id}, 'event');`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addOneTierYear: (body, cb) => {
        var queryString = `INSERT INTO years (tier_id, year_id, type) VALUES (${body.tier_id}, ${body.year_id}, 'tier');`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOneView: (body, cb) => {
        if (body.titleName === "Years") {
            var queryString = `UPDATE ${body.titleName.toLowerCase()} SET value = ${parseInt(body.itemValue)} WHERE id = ${body.id};`;
        }
        else {
            var queryString = `UPDATE ${body.titleName.toLowerCase()} SET name = '${body.itemValue}' WHERE id = ${body.id};`;
        }
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOneView: (body, cb) => {
        var queryString = `DELETE FROM ${body.titleName.toLowerCase()} WHERE id = ${body.id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOneYear: (event_id, tier_id, year_id, cb) => {
        var queryString = `DELETE FROM years WHERE event_id = ${event_id} AND year_id = ${year_id} AND tier_id = ${tier_id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getAllYear: (cb) => {
        const yearAndTierObj = {arrays: [{
            years: [],
            tiers: []
        }]};
        var queryString = `SELECT id, value FROM years WHERE type = 'year';`;
        connection.query(queryString, (err, result1) => {
            if (err) throw err;
            yearAndTierObj.arrays[0].years = [...result1];
            connection.query(`SELECT * FROM tiers;`, (err, result2) => {
                if (err) throw err;
                yearAndTierObj.arrays[0].tiers = [...result2];
                cb(yearAndTierObj);
            });
        });
    },
    getActiveTiers: (id, cb) => {
        const activeTiersObj = {};
        // var queryString = `SELECT * FROM years WHERE year_id = ${parseInt(id)};`;
        // var queryString = `SELECT tiers.name, events.name, years.id, years.tier_id, years.event_id FROM years INNER JOIN tiers ON (years.tier_id = tiers.id) INNER JOIN events ON (years.event_id = events.id) WHERE years.year_id = ${id};`;
        var queryString = `SELECT years.tier_id, tiers.name FROM years INNER JOIN tiers ON (years.tier_id = tiers.id) WHERE years.year_id = ${id} AND years.type = 'tier';`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            activeTiersObj.tiers = [...result];
            var queryString = `SELECT years.event_id, years.tier_id, events.name FROM years INNER JOIN events ON (years.event_id = events.id) WHERE years.year_id = ${id} AND years.type = 'event';`; 
            connection.query(queryString, (err, result) => {
                if (err) throw err;
                for (let i = 0; i < activeTiersObj.tiers.length; i++) {
                    activeTiersObj[activeTiersObj.tiers[i].name] = [];
                    for (let j = 0; j < result.length; j++) {
                        if (result[j].tier_id === activeTiersObj.tiers[i].tier_id) {
                            activeTiersObj[activeTiersObj.tiers[i].name].push(result[j]);
                        }
                    }
                }
                var queryString = `SELECT * FROM events;`;
                connection.query(queryString, (err, result) => {
                    if (err) throw err;
                    activeTiersObj.allEvents = [...result];
                    cb(activeTiersObj);
                });
            });
        });
    }
};

module.exports = orm;