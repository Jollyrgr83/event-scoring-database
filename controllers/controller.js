var express = require("express");
var router = express.Router();

var model = require("../models/model.js");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/year-setup", (req, res) => {
    res.render("year-setup");
});

router.get("/competitor-entry", (req, res) => {
    res.render("competitor-entry");
});

router.get("/score-entry", (req, res) => {
    res.render("score-entry");
});

router.post("/api/", (req, res) => {
    model.add(req.body.name, (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/", (req, res) => {
    model.update(req.body.id, (result) => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

router.delete("/api/", (req, res) => {
    console.log("req.body", req.body);
    model.delete(req.body.id, (result) => {
        console.log("result", result);
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

module.exports = router;