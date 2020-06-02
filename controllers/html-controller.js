var express = require("express");
var router = express.Router();

var model = require("../models/model.js");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/view", (req, res) => {
    res.render("view");
});

router.get("/year", (req, res) => {
    model.getYearOptions((data) => {
        console.log("data", JSON.stringify(data));
        res.render("year", data);
    });
});

router.get("/competitors", (req, res) => {
    res.render("competitors");
});

router.get("/score", (req, res) => {
    res.render("score");
});

module.exports = router;