var connection = require("../config/connection.js");

var orm = {
    selectAllTiers: (cb) => {
        var queryString = `SELECT * FROM tiers;`;
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
    }
};

module.exports = orm;