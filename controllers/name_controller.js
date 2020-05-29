var express = require("express");
var router = express.Router();

var handler_name = require("../models/handler_name.js");

router.get("/", (req, res) => {
    handler_name.all((data) => {
        var hbsObject = {
            data_name: data
        };
    res.render("index", hbsObject);
    });
});

router.post("/api/", (req, res) => {
    handler_name.add(req.body.name, (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/", (req, res) => {
    handler_name.update(req.body.id, (result) => {
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
    handler_name.delete(req.body.id, (result) => {
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