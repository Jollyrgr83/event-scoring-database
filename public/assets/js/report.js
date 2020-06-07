$(() => {
    getAll();

    let obj;

    $(document).on("click", ".button", (event) => {
        // only button is the create pdf button
    });

    $(document).on("change", "#year-select", event => getAll());

    $(document).on("change", "#report-select", event => renderEventMenuAll());

    $(document).on("change", "#dynamic-select-tier", event => renderEventMenuTier());

    $(document).on("change", "#dynamic-select-org", event => renderScores());

    $(document).on("change", "#event-select", event => renderScores());

    function getAll() {
        $.get("/api/report/all/" + parseInt($("#year-select").val()), (data) => {
            obj = JSON.parse(JSON.stringify(data));
            console.log("obj", obj);
            renderEventMenuAll();
        });
    }

    function renderEventMenuAll() {
        $("#event-select").empty();
        $("#dynamic-menu").empty();
        if ($("#report-select").val() === "2") {
            // render dynamic menu
            $("#dynamic-menu").empty();
            let menuArray = [];
            let tier_id_array = Object.keys(obj.tiers);
            for (let i = 0; i < tier_id_array.length; i++) {
                let tier_id = parseInt(tier_id_array[i]);
                menuArray.push({id: tier_id, text: `${obj.tier_ref[tier_id].name}`});
            }
            var pTitleEl = $("<p>");
            pTitleEl.text("Select Competition Tier");
            pTitleEl.attr("class", "item-title mx-auto");
            $("#dynamic-menu").append(pTitleEl);
            var selectEl = $("<select>");
            selectEl.attr("id", "dynamic-select-tier");
            for (let i = 0; i < menuArray.length; i++) {
                var optionEl = $("<option>");
                optionEl.text(menuArray[i].text);
                optionEl.attr("value", menuArray[i].id);
                selectEl.append(optionEl);
            }
            $("#dynamic-menu").append(selectEl);
            // render event selections
            let optionArray = [];
            let tier_id = menuArray[0].id;
            let event_id_array = Object.keys(obj.tiers[tier_id]);
            for (let i = 0; i < event_id_array.length; i++) {
                if (isNaN(parseInt(event_id_array[i]))) {
                    var event_id = event_id_array[i];
                } else {
                    var event_id = parseInt(event_id_array[i]);
                }
                optionArray.push({id: `${tier_id}-${event_id}`, text: `${obj.tier_ref[tier_id].name} - ${obj.event_ref[event_id]}`});
            }
            for (let i = 0; i < optionArray.length; i++) {
                var optionEl = $("<option>");
                optionEl.text(optionArray[i].text);
                optionEl.attr("value", optionArray[i].id);
                $("#event-select").append(optionEl);
            }
        } else {
            // retrieve all competitors information (View Top 3 and View All Results)
            if ($("#report-select").val() === "3") {
                // render dynamic menu
                $("#dynamic-menu").empty();
                let menuArray = [];
                let org_id_array = Object.keys(obj.org_ref);
                for (let i = 0; i < org_id_array.length; i++) {
                    let org_id = parseInt(org_id_array[i]);
                    menuArray.push({id: org_id, text: `${obj.org_ref[org_id].name}`});
                }
                var pTitleEl = $("<p>");
                pTitleEl.text("Select Organization");
                pTitleEl.attr("class", "item-title mx-auto");
                $("#dynamic-menu").append(pTitleEl);
                var selectEl = $("<select>");
                selectEl.attr("id", "dynamic-select-org");
                for (let i = 0; i < menuArray.length; i++) {
                    var optionEl = $("<option>");
                    optionEl.text(menuArray[i].text);
                    optionEl.attr("value", menuArray[i].id);
                    selectEl.append(optionEl);
                }
                $("#dynamic-menu").append(selectEl);
            }
            let optionArray = [];
            let tier_id_array = Object.keys(obj.tiers);
            for (let i = 0; i < tier_id_array.length; i++) {
                let tier_id = parseInt(tier_id_array[i]);
                let event_id_array = Object.keys(obj.tiers[tier_id]);
                for (let j = 0; j < event_id_array.length; j++) {
                    if (isNaN(parseInt(event_id_array[j]))) {
                        var event_id = event_id_array[j];
                    } else {
                        var event_id = parseInt(event_id_array[j]);
                    }
                    optionArray.push({id: `${tier_id}-${event_id}`, text: `${obj.tier_ref[tier_id].name} - ${obj.event_ref[event_id]}`});
                }
            }
            for (let i = 0; i < optionArray.length; i++) {
                var optionEl = $("<option>");
                optionEl.text(optionArray[i].text);
                optionEl.attr("value", optionArray[i].id);
                $("#event-select").append(optionEl);
            }
            renderScores()
        }
    }

    function renderEventMenuTier() {
        $("#event-select").empty();
        let optionArray = [];
        let tier_id = parseInt($("#dynamic-select-tier").val());
        let event_id_array = Object.keys(obj.tiers[tier_id]);
        for (let i = 0; i < event_id_array.length; i++) {
            if (isNaN(parseInt(event_id_array[i]))) {
                var event_id = event_id_array[i];
            } else {
                var event_id = parseInt(event_id_array[i]);
            }
            optionArray.push({id: `${tier_id}-${event_id}`, text: `${obj.tier_ref[tier_id].name} - ${obj.event_ref[event_id]}`});
        }
        for (let i = 0; i < optionArray.length; i++) {
            var optionEl = $("<option>");
            optionEl.text(optionArray[i].text);
            optionEl.attr("value", optionArray[i].id);
            $("#event-select").append(optionEl);
        }
    }

    function renderScores() {

    }
});