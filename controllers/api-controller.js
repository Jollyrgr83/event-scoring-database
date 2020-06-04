// DEPENDENCIES
// ==================================================
var express = require("express");
var router = express.Router();
var model = require("../models/model.js");
// ==================================================
// GET ROUTES
// ==================================================
// sends data to view.js to build the view and edit items section
router.get("/api/view/menu/:tableName", (req, res) => {
    model.getAllFromOneTable(req.params.tableName, data => {
        if (data[0].value) {
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === "year") {
                    arr.push({id: data[i].id, name: data[i].value});
                }
            }
            res.json({data: arr});
        } else {
            res.json({data: data});
        }
    });
});
// sends data to comp.js to render competitor selection menu in view/edit competitors section
router.get("/api/comp/year/:year", (req, res) => {
    if (isNaN(parseInt(req.params.year))) {
        res.json([])
    } else {
        model.getAllCompetitorsByYear(parseInt(req.params.year), data => res.json(data.map(x => x.team ? {id: x.id, text: `${x.comp_number} - ${x.team_name}: ${x.group_names}`} : {id: x.id, text: `${x.comp_number} - ${x.first_name} ${x.last_name}`})));
    }
});
// sends data to comp.js to render competitor name and number information in view/edit competitors section
router.get("/api/comp/competitor/:competitor_id", (req, res) => {
    if (isNaN(parseInt(req.params.competitor_id))) {
        res.json([]);
    } else {
        model.getOneCompetitorByID(parseInt(req.params.competitor_id), data => res.json(data[0]));
    }
});
// sends boolean result to comp.js for team field based on tier id
router.get("/api/comp/tier/:id", (req, res) => {
    model.getTeamBooleanByTierID(parseInt(req.params.id), data => res.json(data));
});
// sends all organizations to comp.js for organization selection menu in add section
router.get("/api/comp/org/", (req, res) => {
    model.getAllFromOneTable("organizations", data => res.json(data));
});
// sends data to year.js to render the tier and event information for the selected year 
router.get("/api/year/:id", (req, res) => {
    model.getAllTiersByYearID(parseInt(req.params.id), data => res.json(data));
});

router.get("/api/score/one/:compID", (req, res) => {
    model.getCompScores(parseInt(req.params.compID.split("&")[0]), parseInt(req.params.compID.split("&")[0]), data => res.json(data));
});

router.get("/api/score/year-setup/:inputData", (req, res) => {
    model.scoreReconciliation(parseInt(req.params.inputData.split("&")[0]), parseInt(req.params.inputData.split("&")[1]), data => res.json(data));
});
// ==================================================
// POST ROUTES
// ==================================================
router.post("/api/view/", (req, res) => {
    model.addView(req.body, (data) => {
        res.json(data);
    });
});

router.post("/api/year/", (req, res) => {
    model.addEventYear(req.body, (data) => {
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
// ==================================================
// PUT ROUTES
// ==================================================
router.put("/api/view/", (req, res) => {
    model.updateView(req.body, (data) => {
        res.json(data);
    });
});

router.put("/api/comp/update/", (req, res) => {
    model.updateComp(req.body, (data) => {
        res.json(data);
    });
});

router.put("/api/score/", (req, res) => {
    model.updateScores(req.body.data, (data) => {
        res.json(data);
    });
});
// ==================================================
// DELETE ROUTES
// ==================================================
router.delete("/api/view/", (req, res) => {
    model.deleteView(req.body, (data) => {
        res.json(data);
    });
});

router.delete("/api/year/", (req, res) => {
    model.deleteYear(req.body.event_id, req.body.tier_id, req.body.year_id, (data) => {
        res.json(data);
    });
});

router.delete("/api/year/tier/", (req, res) => {
    model.deleteYearTier(req.body, (data) => {
        res.json(data);
    });
});

router.delete("/api/comp/", (req, res) => {
    model.deleteComp(req.body, (data) => {
        res.json(data);
    });
});
// ==================================================
// EXPORTS
// ==================================================
module.exports = router;