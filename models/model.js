var orm = require("../config/orm.js");

var handler_name = {
    yearAll: (year, cb) => {
        orm.selectAllYear(year, (res) => {
            cb(res);
        });
    },
    tierAll: (cb) => {
        orm.selectAllTiers((res) => {
            cb(res);
        });
    }
};

module.exports = handler_name;