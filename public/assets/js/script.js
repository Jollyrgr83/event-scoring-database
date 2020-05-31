$(() => {
    $(".button").on("click", (event) => {
        var ID = $(event.target).attr("id");
        console.log("ID: ", ID);
        var routes = {
            "home": "/",
            "comp": "/competitor-entry",
            "year": "/year-setup",
            "score": "/score-entry",
            "rep": "/reports",
            "help": "/instructions"
        };
        if (routes[ID]) {
            window.location.href = routes[ID];
        }
        else if (ID === "year-update-button") {
            $.ajax("/api/year-setup", {
                type: "POST",
                data: {
                    year: parseInt($("#year-input").val().trim())
                }
              }).then((data) => {
                renderYear(data);
              });
        }
        else if (ID === "year-save-button") {
            // grab input values, put in object, pass to PUT request
            
            $.ajax("/api/year-setup", {
                type: "POST",
                data: {}
            }).then((data) => {
                renderYear(data);
            });
        }
    });

    $(".nav-button").on("click", (event) => {
        var ID = $(event.target).attr("id");
        console.log("ID: ", ID);
    });

    function renderYear(data) {
        $("#dynamic").empty();
        let obj = {};
        for (let i = 0; i < data.tier.length; i++) {
            obj[data.tier[i].tier_name] = [];
        }
        for (let i = 0; i < data.all.length; i++) {
            obj[data.all[i].tier_name].push(data.all[i]);
        }
        for (let i = 0; i < data.tier.length; i++) {
            let tierName = data.tier[i].tier_name;
            console.log("tierName", tierName);
            console.log("obj[tierName]", obj[tierName]);
            var sectionEl = $("<section>");
            sectionEl.attr("class", "main-container mx-auto text-center");
            var pTitleEl = $("<p>");
            pTitleEl.attr("class", "mini-title mx-auto");
            pTitleEl.text(tierName + " Tier");
            sectionEl.append(pTitleEl);
            for (let j = 0; j < obj[tierName].length; j++) {
                var inputEl = $("<input>");
                inputEl.attr("id", obj[tierName][j].id);
                inputEl.attr("type", "text");
                inputEl.val(obj[tierName][j].event_name);
                sectionEl.append(inputEl);
            }
            var pAddEl = $("<p>");
            pAddEl.attr("class", "item-title mx-auto");
            pAddEl.text("Add an Event");
            var addInputEl = $("<input>");
            addInputEl.attr("id", tierName + "EventInput");
            addInputEl.attr("type", "text");
            addInputEl.attr("placeholder", "Enter Event Name");
            var addButtonEl = $("<button>");
            addButtonEl.attr("class", "button");
            addButtonEl.attr("id", tierName + "EventInputButton");
            addButtonEl.text("Add Event");
            sectionEl.append(pAddEl);
            sectionEl.append(addInputEl);
            sectionEl.append(addButtonEl);
            $("#dynamic").append(sectionEl);
        }
    }

});

// post routes
// year-setup:
// add tier - update db first, then pull from db, and build screen using handlebars? (need partials)