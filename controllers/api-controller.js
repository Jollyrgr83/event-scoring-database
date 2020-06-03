var express = require("express");
var router = express.Router();

var model = require("../models/model.js");

router.get("/api/tier/", (req, res) => {
    model.allTiers((data) => {
        res.json({tiers: data});
    });
});

router.get("/api/events/", (req, res) => {
    model.allEvents((data) => {
        res.json(data);
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

router.get("/api/comp/:yearValue", (req, res) => {
    model.allComp(parseInt(req.params.yearValue), (data) => {
        let returnData = data.map((x) => {
            if (x.team) {
                return {id: x.id, text: `${x.comp_number} - ${x.team_name}: ${x.group_names}`};
            } 
            else {
                return {id: x.id, text: `${x.comp_number} - ${x.first_name} ${x.last_name}`};
            }
        });
        res.json(returnData);
    });
});

router.get("/api/comp/compID/:compID", (req, res) => {
    model.oneComp(parseInt(req.params.compID), (data) => {
        res.json(data);
    });
});

router.get("/api/org/", (req, res) => {
    console.log("api allOrgs Run:");
    model.allOrgs((data) => {
        console.log("api allOrgs data: ", data);
        res.json(data);
    });
});

router.get("/api/comp/tierInfo/:id", (req, res) => {
    model.tierInfo(parseInt(req.params.id), (data) => {
        res.json(data);
    });
});

router.get("/api/year/:id", (req, res) => {
    model.getActiveTiers(parseInt(req.params.id), (data) => {
        console.log("getActiveYears: ", data);
        res.json(data);
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

router.post("/api/year/", (req, res) => {
    console.log("year POST body: ", req.body);
    model.addEventYear(req.body, (data) => {
        console.log("data", data);
        res.json(data);
    });
});

router.post("/api/year/tier/", (req, res) => {
    model.addTierYear(req.body, (data) => {
        res.json(data);
    });
});

router.post("/api/comp/", (req, res) => {
    model.addOneComp(req.body, (data) => {
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

router.put("/api/comp/update/", (req, res) => {
    model.updateComp(req.body, (data) => {
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

router.delete("/api/year/", (req, res) => {
    console.log("year DELETE body: ", req.body);
    model.deleteYear(req.body.event_id, req.body.tier_id, req.body.year_id, (data) => {
        console.log("data", data);
        res.json(data);
    });
});

router.delete("/api/year/tier/", (req, res) => {
    model.deleteYearTier(req.body, (data) => {
        console.log("data", data);
        res.json(data);
    });
});

router.delete("/api/comp/", (req, res) => {
    model.deleteComp(req.body, (data) => {
        res.json(data);
    });
});

module.exports = router;