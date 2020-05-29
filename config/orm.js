var connection = require("../config/connection.js");

var orm = {
    selectAll: (cb) => {
        var queryString = "SELECT * FROM table_name;";
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (inputs, cb) => {
        var queryString = `INSERT INTO table_name (col_name) VALUES (?);`;
        connection.query(queryString, inputs, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (inputs, cb) => {
        var queryString = `UPDATE table_name SET col_name = true WHERE id = ?;`;
        connection.query(queryString, inputs, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOne: (inputs, cb) => {
        var queryString = `DELETE FROM table_name WHERE id = ?`;
        connection.query(queryString, inputs, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;