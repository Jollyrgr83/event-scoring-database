var express = require("express");
var router = express.Router();
var model = require("../models/model.js");

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
// sends data to year.js to render the tier and event information for the selected year 
router.get("/api/year/:id", (req, res) => {
    model.getAllTiersByYearID(parseInt(req.params.id), data => res.json(data));
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
// sends all event scores for one competitor to score.js to render competitor scores 
router.get("/api/score/competitor/:competitor_id", (req, res) => {
    model.getCompetitorScores(parseInt(req.params.competitor_id.split("&")[0]), parseInt(req.params.competitor_id.split("&")[1]), data => res.json(data));
});
// sends score reconciliation data to score.js
router.get("/api/score/reconcile/:year_id", (req, res) => {
    const obj = {year_id: parseInt(req.params.year_id), tiers: {}};
    model.getScoreReconciliation(obj.year_id, (data) => {
        // parse SQL result
        for (let i = 0; i < data.tiers.length; i++) {
            obj.tiers[data.tiers[i].tier_id] = {competitor_id: [], event_id: []};
            for (let j = 0; j < data.events.length; j++) {
                if (data.events[j].tier_id === data.tiers[i].tier_id) {
                    obj.tiers[data.tiers[i].tier_id].event_id.push(data.events[j]);
                }
            }
            for (let j = 0; j < data.competitors_table.length; j++) {
                if (data.competitors_table[j].tier_id === data.tiers[i].tier_id) {
                    obj.tiers[data.tiers[i].tier_id].competitor_id.push(data.competitors_table[j]);
                }
            }
        }
        // build required score entries
        obj.req = [];
        let tier_arr = Object.keys(obj.tiers);
        for (let i = 0; i < tier_arr.length; i++) {
            for (let j = 0; j < obj.tiers[tier_arr[i]].competitor_id.length; j++) {
                for (let k = 0; k < obj.tiers[tier_arr[i]].event_id.length; k++) {
                    var item = {
                        year_id: obj.year_id,
                        competitor_id: obj.tiers[tier_arr[i]].competitor_id[j].id,
                        event_id: obj.tiers[tier_arr[i]].event_id[k].event_id
                    };
                    obj.req.push(item);
                }
            }
        }
        // compare against actual
        obj.delta = [];
        for (let i = 0; i < obj.req.length; i++) {
            let counter = true;
            for (let j = 0; j < data.act.length; j++) {
                if (obj.req[i].competitor_id === data.act[j].competitor_id && obj.req[i].event_id === data.act[j].event_id) {
                    counter = false;
                }
            }
            if (counter) {
                obj.delta.push(obj.req[i]);
            }
        }
        // insert missing score table records
        for (let i = 0; i < obj.delta.length; i++) {
            model.addScore(obj.delta[i], data => console.log(data));
        }
        obj.scores = data;
        res.json(obj);
    });
});
// sends all scores and competitor data for selected year to report.js
router.get("/api/report/all/:year_id", (req, res) => {
    model.getAllScoresByYearID(parseInt(req.params.year_id), (data) => {
        const obj = {data: data};
        let compArr = [];
        for (let i = 0; i < data.competitors.length; i++) {
            let tempArr = [];
            for (let j = 0; j < data.scores.length; j++) {
                if (data.scores[j].competitor_id === data.competitors[i].id) {
                   tempArr.push(data.scores[j]);
                }
            }
            var score = 0;
            var time = 0;
            for (let j = 0; j <tempArr.length; j++) {
                score+=tempArr[j].score;
                tempArr[j].total_seconds = (tempArr[j].time_minutes * 60) +tempArr[j].time_seconds;
                time+=tempArr[j].total_seconds;
            }
            tempArr.push({id: "overall", score: score, total_seconds: time});
            data.competitors[i].events = {};
            for (let j = 0; j < tempArr.length; j++) {
                data.competitors[i].events[tempArr[j].id] = tempArr[j];
            }
            compArr.push(data.competitors[i]);
        }
        obj.competitors = [...compArr];
        res.json(obj);
    });
});
// receives data from view.js and adds new category (tier, event, organization, year)
router.post("/api/view/", (req, res) => {
    model.addCategory(req.body, data => res.json(data));
});
// receives data from year.js and adds new event
router.post("/api/year/", (req, res) => {
    model.addEvent(req.body, data => res.json(data));
});
// receives data from year.js and adds new tier
router.post("/api/year/tier/", (req, res) => {
    model.addTier(req.body, data => res.json(data));
});
// receives data from comp.js and adds new competitor
router.post("/api/comp/", (req, res) => {
    model.addCompetitor(req.body, data => res.json(data));
});
// receives data from view.js and updates category record (tier, entry, organization, year)
router.put("/api/view/", (req, res) => {
    model.updateCategory(req.body, data => res.json(data));
});
// receives data from comp.js and updates competitor record
router.put("/api/comp/update/", (req, res) => {
    model.updateCompetitor(req.body, data => res.json(data));
});
// receives data from score.js 
router.put("/api/score/", (req, res) => {
    model.updateCompetitorScores(req.body.data, data => res.json(data));
});
// receives data from view.js and deletes category record (tier, entry, organization, year)
router.delete("/api/view/", (req, res) => {
    model.deleteCategory(req.body, data => res.json(data));
});
// receives data from year.js and deletes event record
router.delete("/api/year/", (req, res) => {
    model.deleteEvent(req.body.event_id, req.body.tier_id, req.body.year_id, data => res.json(data));
});
// receives data from year.js and deletes tier record
router.delete("/api/year/tier/", (req, res) => {
    model.deleteTier(req.body, data => res.json(data));
});
// receives data from comp.js and deletes competitor record
router.delete("/api/comp/", (req, res) => {
    model.deleteCompetitor(req.body, data => res.json(data));
});

module.exports = router;