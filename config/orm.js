var connection = require("../config/connection.js");

var orm = {
    // SELECT QUERIES
    selectAllFromOneTable: (table_name, cb) => {
        if (table_name === "years") {
            var queryString = `SELECT * FROM years WHERE type = "year";`;
        } else {
            var queryString = `SELECT * FROM ${table_name};`;
        }
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectAllCompetitorsByYear: (year, cb) => {
        var queryString = `SELECT competitors.id, competitors.first_name, competitors.last_name, competitors.team_name, competitors.group_names, competitors.comp_number, tiers.name, tiers.team FROM competitors INNER JOIN tiers ON (competitors.tier_id = tiers.id) WHERE year_id = ${year};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectOneCompetitorByID: (competitor_id, cb) => {
        var queryString = `SELECT competitors.id, competitors.first_name, competitors.last_name, competitors.team_name, competitors.group_names, competitors.comp_number, tiers.name, tiers.team FROM competitors INNER JOIN tiers ON (competitors.tier_id = tiers.id) WHERE competitors.id = ${competitor_id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectTeamBooleanByTierID: (tier_id, cb) => {
        var queryString = `SELECT team FROM tiers WHERE id = ${tier_id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectAllTiersByYearID: (year_id, cb) => {
        const activeTiersObj = {year_id: year_id};
        var queryString = `SELECT years.tier_id, tiers.name FROM years INNER JOIN tiers ON (years.tier_id = tiers.id) WHERE years.year_id = ${activeTiersObj.year_id} AND years.type = 'tier';`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            activeTiersObj.tiers = [...result];
            var queryString = `SELECT years.event_id, years.tier_id, events.name FROM years INNER JOIN events ON (years.event_id = events.id) WHERE years.year_id = ${activeTiersObj.year_id} AND years.type = 'event';`; 
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
    },
    selectScoresByCompetitor: (competitor_id, year_id, cb) => {
        if (isNaN(competitor_id)) {
            cb([]);
        } else {
            var queryString = `SELECT scores.id, scores.score, scores.time_minutes, scores.time_seconds, events.name FROM scores INNER JOIN events ON (scores.event_id = events.id) WHERE scores.competitor_id = ${competitor_id} AND scores.year_id = ${year_id};`;
            connection.query(queryString, (err, result) => {
                if (err) throw err;
                cb(result);
            });
        }
    },
    selectAllScoreReconciliation: (year_id, cb) => {
        const resultObj = {year_id: year_id};
        // pull records for tiers from years table for selected year
        var queryString = `SELECT tier_id FROM years WHERE year_id = ${resultObj.year_id} AND type = "tier";`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            resultObj.tiers = [...result];
            // pull records for competitors from competitors table for selected year
            var queryString = `SELECT * FROM competitors WHERE year_id = ${resultObj.year_id};`;
            connection.query(queryString, (err, result) => {
                if (err) throw err;
                resultObj.competitors_table = [...result];
                // pull records for tiers and events from scores table for selected year
                var queryString = `SELECT competitor_id, event_id, year_id FROM scores WHERE year_id = ${resultObj.year_id};`;
                connection.query(queryString, (err, result) => {
                    if (err) throw err;
                    resultObj.act = [...result];
                    var queryString = `SELECT event_id, tier_id FROM years WHERE year_id = ${resultObj.year_id} AND type = "event";`;
                    connection.query(queryString, (err, result) => {
                        resultObj.events = [...result];
                        cb(resultObj);
                    });
                });
            });
        });
    },
    selectAllScoresByYearID: (year_id, cb) => {
        const scoreObj = {};
        var queryString = `SELECT * FROM scores WHERE year_id = ${year_id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            scoreObj.scores = [...result];
            var queryString = `SELECT * FROM competitors WHERE year_id = ${year_id};`;
            connection.query(queryString, (err, result) => {
                if (err) throw err;
                scoreObj.competitors = [...result];
                cb(scoreObj);
            });
        });
    },
    // INSERT QUERIES
    insertOneCategory: (body, cb) => {
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
    insertOneEvent: (body, cb) => {
        var queryString = `INSERT INTO years (tier_id, event_id, year_id, type) VALUES (${body.tier_id}, ${body.event_id}, ${body.year_id}, 'event');`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOneTier: (body, cb) => {
        var queryString = `INSERT INTO years (tier_id, year_id, type) VALUES (${body.tier_id}, ${body.year_id}, 'tier');`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOneCompetitor: (body, cb) => {
        var queryString = `INSERT INTO competitors (tier_id, comp_number, first_name, last_name, team_name, group_names, org_id, year_id) VALUES (${body.tier_id}, '${body.comp_number}', '${body.first_name}', '${body.last_name}', '${body.team_name}', '${body.group_names}', ${body.org_id}, ${body.year_id});`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOneScore: (body, cb) => {
        var queryString = `INSERT INTO scores (year_id, competitor_id, event_id) VALUES (${body.year_id}, ${body.competitor_id}, ${body.event_id});`;
        connection.query(queryString, (err, result) => {
            cb(result);
        });
    },
    // UPDATE QUERIES
    updateOneCategory: (body, cb) => {
        var queryString = "";
        body.titleName === "Years" ? queryString = `UPDATE ${body.titleName.toLowerCase()} SET value = ${parseInt(body.itemValue)} WHERE id = ${body.id};` : queryString = `UPDATE ${body.titleName.toLowerCase()} SET name = '${body.itemValue}' WHERE id = ${body.id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOneCompetitor: (body, cb) => {
        var queryString = `UPDATE competitors SET comp_number = '${body.comp_number}', first_name = '${body.first_name}', last_name = '${body.last_name}', team_name = '${body.team_name}', group_names = '${body.group_names}' WHERE id = ${body.id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateScoresByCompetitor: (arr, cb) => {
        const resultArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value != null && arr[i].value != "") {
                var queryString = `UPDATE scores SET ${arr[i].title} = ${arr[i].value} WHERE id = ${arr[i].id};`;
                connection.query(queryString, (err, result) => {
                    if (err) throw err;
                    resultArr.push(result);
                });
            }
        }
        cb(resultArr);
    },
    // DELETE QUERIES
    deleteOneCategory: (body, cb) => {
        var queryString = `DELETE FROM ${body.titleName.toLowerCase()} WHERE id = ${body.id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOneEvent: (event_id, tier_id, year_id, cb) => {
        var queryString = `DELETE FROM years WHERE event_id = ${event_id} AND year_id = ${year_id} AND tier_id = ${tier_id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOneTier: (body, cb) => {
        var queryString = `DELETE FROM years WHERE year_id = ${body.year_id} AND tier_id = ${body.tier_id};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOneCompetitor: (body, cb) => {
        var queryString = `DELETE FROM competitors WHERE id = ${parseInt(body.id)};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;