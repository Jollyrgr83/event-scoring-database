var express = require("express");
var router = express.Router();

var model = require("../models/model.js");

router.get("/", (req, res) => {
    var hbsObj = {
        title: "Annual Lineworkers Rodeo Scoring"
    };
    res.render("index", hbsObj);
});

router.get("/view", (req, res) => {
    var hbsObj = {
        title: "View/Edit Database Options"
    };
    res.render("view", hbsObj);
});

router.get("/year", (req, res) => {
    model.getYearOptions((data) => {
        console.log("data", JSON.stringify(data));
        data.arrays[0].title = "Rodeo Scoring Year Setup";
        res.render("year", data);
    });
});

router.get("/competitors", (req, res) => {
    model.getYearOptions((data) => {
        console.log("data", JSON.stringify(data));
        data.arrays[0].title = "Add/Edit Competitors";
        res.render("competitors", data);
    });
});

router.get("/score", (req, res) => {
    model.getYearOptions((data) => {
        console.log("data", JSON.stringify(data));
        data.arrays[0].title = "Score Entry";
        res.render("score", data);
    });
});

router.get("/reports", (req, res) => {
    var hbsObj = {
        title: "View/Print Reports"
    };
    res.render("reports", hbsObj);
});

module.exports = router;