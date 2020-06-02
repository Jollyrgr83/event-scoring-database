var express = require("express");
var router = express.Router();

var model = require("../models/model.js");

router.get("/api/tier", (req, res) => {
    model.allTiers((data) => {
        res.json({tiers: data});
    });
});

router.get("/api/view/:tableName", (req, res) => {
    console.log("tableName", req.params.tableName);
    model.allView(req.params.tableName, (data) => {
        console.log("data", data);
        if (data[0].value) {
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === "year") {
                    arr.push({
                        id: data[i].id,
                        name: data[i].value
                    });
                }
            }
            res.json({data: arr});
        }
        else {
            res.json({data: data});
        }
    });
});

router.post("/api/view/", (req, res) => {
    console.log("view POST body: ", req.body);
    model.addView(req.body, (data) => {
        console.log("data", data);
        console.log("data.insertId", data.insertId);
        res.json(data);
    });
});

router.put("/api/view/", (req, res) => {
    console.log("view PUT body: ", req.body);
    model.updateView(req.body, (data) => {
        console.log("data", data);
        res.json(data);
    });
});

router.delete("/api/view/", (req, res) => {
    console.log("view DELETE body: ", req.body);
    model.deleteView(req.body, (data) => {
        console.log("data", data);
        res.json(data);
    });
});

module.exports = router;