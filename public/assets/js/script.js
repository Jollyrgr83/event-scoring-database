$(() => {
    $(document).on("click", ".button", (event) => {
        var ID = $(event.target).attr("id");
        console.log("ID: ", ID);
        var routes = {
            "home": "/",
            "view": "/view",
            "year": "/year",
            "comp": "/competitors",
            "score": "/score",
            "reports": "/reports",
            "help": "/help"
        };
        if (routes[ID]) {
            window.location.href = routes[ID];
        }
        else if (ID === "view-menu-button") {
            var titleName = $("#view-menu").val();
            getView(titleName);
        }
        else if (ID === "add-menu-button") {
            var titleName = $("#add-menu").val();
            renderAddMenu(titleName);
        }
        else if (ID === "add-container-button") {
            var titleName = $("#add-menu").val();
            var itemName = $("#add-container-input").val().trim();
            if (itemName === "" || (isNaN(parseInt(itemName)) && titleName === "Years")) {
                renderAddMessage("error", titleName);
            }
            else {
                if (titleName === "Tiers") {
                    var teamStatus = $("#tiers-add-select").val();
                }
                else if (titleName === "Organizations") {
                    var teamStatus = null;
                    var coopStatus = $("#organizations-add-select").val();
                }
                renderAddMessage("success", titleName, itemName, teamStatus, coopStatus);
            }
        }
        else if (ID === "year-update-button") {
            var selectMenu = $("#year-select");
            var selectMenuKeys = Object.keys(selectMenu["0"]);
            for (let i = 0; i < selectMenuKeys.length; i++) {
                if (selectMenu["0"][i].selected) {
                    var selectionValue = parseInt(selectMenu["0"][i].value);
                }
            }
            console.log("selectionValue", selectionValue);
            $.get("/api/year/" + selectionValue, (data) => {
                console.log("year data: ", data);
                renderYearSetup(data);
            });

        }
        else if (ID === "year-add-tier-button") {
            var year_id = parseInt($("#year-select").val());
            var tier_id = parseInt($("#tier-select").val());
            $.ajax("/api/year/tier/", {
                type: "POST",
                data: {
                    year_id: year_id,
                    tier_id: tier_id
                }
            }).then((res) => {
                window.location.href = "/year";
            });
        }
    });

    $(document).on("click", ".view-button", (event) => {
        var clickClass = $(event.target).attr("class");
        var ID = parseInt($(event.target).attr("id"));
        var titleName = $("#view-menu").val();
        var itemValue = $(`#input-${ID}`).val().trim();
        if (itemValue === "") {
            return;
        }
        else if (clickClass.indexOf("delete") != -1) {
            clickClass = "delete";
            $.ajax("/api/view/", {
                type: "DELETE",
                data: {
                    titleName: titleName,
                    id: ID
                }
            }).then((res) => {
                console.log("res", res);
                if (res.affectedRows === 1) {
                    window.location.href = "/view";
                }
            });
        }
        else if (clickClass.indexOf("update") != -1) {
            clickClass = "update";
            $.ajax("/api/view/", {
                type: "PUT",
                data: {
                    titleName: titleName,
                    id: ID,
                    itemValue: itemValue
                }
            }).then((res) => {
                console.log("res", res);
                if (res.affectedRows === 1) {
                    window.location.href = "/view";
                }
            });
        }
        
    });

    $(document).on("click", ".year-button", (event) => {
        var event_id = parseInt($(event.target).attr("data-event_id"));
        var tier_id = parseInt($(event.target).attr("data-tier_id"));
        var year_id = parseInt($("#year-select").val());
        $.ajax("/api/year/", {
            type: "DELETE",
            data: {
                year_id: year_id,
                tier_id: tier_id,
                event_id: event_id
            }
        }).then((res) => {
            console.log("res", res);
            if (res.affectedRows === 1) {
                window.location.href = "/year";
            }
        });      
    });

    $(document).on("click", ".year-add-event-button", (event) => {
        var tier_id = parseInt($(event.target).attr("data-id"));
        var year_id = parseInt($("#year-select").val());
        var event_id = parseInt($(`#year-add-event-select-${tier_id}`).val());
        $.ajax("/api/year/", {
            type: "POST",
            data: {
                year_id: year_id,
                tier_id: tier_id,
                event_id: event_id
            }
        }).then((res) => {
            console.log("res", res);
        });
    });

    function getView(titleName) {
        console.log("titleName", titleName);
        const dataObj = {
            titleName: titleName,
            tableName: titleName.toLowerCase()
        };
        $.get("/api/view/" + dataObj.tableName, (data) => {
            console.log("data", data);
            dataObj.data = [...data.data];
            renderViewMenu(dataObj);
        });
    }

    function renderViewMenu(dataObj) {
        console.log("dataObj", JSON.stringify(dataObj));
        $("#view-container").empty();
        $("#view-container").attr("class", "main-container mx-auto text-center show");
        var warningDivEl = $("<p>");
        warningDivEl.attr("class", "warning mx-auto text-center");
        var warningTitleEl = $("<p>");
        warningTitleEl.attr("style", "font-size: 32px; margin-bottom: 0;");
        warningTitleEl.text("WARNING!");
        var warningTextEl = $("<p>");
        warningTextEl.attr("style", "font-size: 18px;");
        warningTextEl.text("Deleting an item will also remove all records associated with that item.");
        var pTitleEl = $("<p>");
        pTitleEl.attr("class", "mini-title mx-auto");
        pTitleEl.text(dataObj.titleName);
        warningDivEl.append(warningTitleEl);
        warningDivEl.append(warningTextEl);
        $("#view-container").append(warningDivEl);
        $("#view-container").append(pTitleEl);
        for (let i = 0; i < dataObj.data.length; i++) {
            var itemInputEl = $("<input>");
            itemInputEl.attr("id", `input-${dataObj.data[i].id}`);
            itemInputEl.attr("type", "text");
            itemInputEl.val(dataObj.data[i].name);
            var updateButtonEl = $("<button>");
            updateButtonEl.attr("id", `${dataObj.data[i].id}`);
            updateButtonEl.attr("class", "view-button update mx-auto");
            updateButtonEl.text("Update");
            var deleteButtonEl = $("<button>");
            deleteButtonEl.attr("id", `${dataObj.data[i].id}`);
            deleteButtonEl.attr("class", "view-button delete mx-auto");
            deleteButtonEl.text("Delete");
            var rowEl = $("<div>");
            rowEl.attr("class", "row mx-auto text-center");
            $("#view-container").append(itemInputEl);
            rowEl.append(updateButtonEl);
            rowEl.append(deleteButtonEl);
            $("#view-container").append(rowEl);
        }
    }

    function renderAddMenu(titleName) {
        $("#add-container").empty();
        var pTitleEl = $("<p>");
        pTitleEl.attr("class", "item-title mx-auto");
        pTitleEl.text(`Enter New ${titleName} Item Name:`);
        $("#add-container").append(pTitleEl);
        var inputEl = $("<input>");
        inputEl.attr("id", "add-container-input");
        inputEl.attr("type", "text");
        $("#add-container").append(inputEl);
        if (titleName === "Tiers") {
            var tiersTextEl = $("<p>");
            tiersTextEl.attr("class", "item-title mx-auto");
            tiersTextEl.text("Are the competitors in this tier individuals or teams?");
            $("#add-container").append(tiersTextEl);
            var tiersSelectEl = $("<select>");
            tiersSelectEl.attr("id", "tiers-add-select");
            var optionYesEl = $("<option>");
            optionYesEl.text("Individuals");
            tiersSelectEl.append(optionYesEl);
            var optionNoEl = $("<option>");
            optionNoEl.text("Teams");
            tiersSelectEl.append(optionNoEl);
            $("#add-container").append(tiersSelectEl);
        }
        else if (titleName === "Organizations") {
            var organizationsTextEl = $("<p>");
            organizationsTextEl.attr("class", "item-title mx-auto");
            organizationsTextEl.text("Is this organization a coop?");
            $("#add-container").append(organizationsTextEl);
            var organizationsSelectEl = $("<select>");
            organizationsSelectEl.attr("id", "organizations-add-select");
            var optionYesEl = $("<option>");
            optionYesEl.text("Yes");
            organizationsSelectEl.append(optionYesEl);
            var optionNoEl = $("<option>");
            optionNoEl.text("No");
            organizationsSelectEl.append(optionNoEl);
            $("#add-container").append(organizationsSelectEl);
        }
        var buttonEl = $("<button>");
        buttonEl.attr("class", "button mx-auto");
        buttonEl.attr("id", "add-container-button");
        buttonEl.text(`Add New ${titleName} Item`);
        $("#add-container").append(buttonEl);
        var messageEl = $("<div>");
        messageEl.attr("id", "add-message-container");
        $("#add-container").append(messageEl);
    }

    function renderAddMessage(status, titleName, itemName, teamStatus, coopStatus) {
        $("#add-container").empty();
        if (status === "error") {
            console.log("status was error");
            var textEl = $("<p>");
            textEl.attr("class", "item-title");
            textEl.text("Please ensure that your entry is not blank or is a valid number for a year entry.");
            renderAddMenu(titleName);
            $("#add-container").append(textEl);
        }
        else {
            console.log("status was success");
            const addObj = {
                titleName: titleName,
                itemName: itemName,
            };
            if (teamStatus === "Individuals" || teamStatus === "Teams") {
                if (teamStatus === "Teams") {
                    addObj.teamStatus = true;
                }
                else {
                    addObj.teamStatus = false;
                }
            }
            else if (coopStatus === "Yes" || coopStatus === "No") {
                if (coopStatus === "Yes") {
                    addObj.coopStatus = true;
                }
                else {
                    addObj.coopStatus = false;
                }
            }
            $.ajax("/api/view/", {
                type: "POST",
                data: addObj
            }).then((res) => {
                console.log("response", res);
                var textEl = $("<p>");
                textEl.attr("class", "item-title");
                textEl.text(`Success! Item Added!`);
                $("#add-container").append(textEl);
            });
        }
    }

    function renderYearSetup(data) {
        var main = $("#dynamic");
        main.empty();
        for (let i = 0; i < data.tiers.length; i++) {
            var containerEl = $("<section>");
            containerEl.attr("class", "main-container mx-auto text-center");
            var pTitleEl = $("<p>");
            pTitleEl.attr("class", "mini-title mx-auto");
            pTitleEl.text(`${data.tiers[i].name} Tier`);
            containerEl.append(pTitleEl);
            for (let j = 0; j < data[data.tiers[i].name].length; j++) {
                var itemInputEl = $("<input>");
                itemInputEl.attr("class", "year-input mx-auto");
                itemInputEl.attr("data-id", data[data.tiers[i].name][j].event_id);
                itemInputEl.attr("type", "text");
                itemInputEl.val(data[data.tiers[i].name][j].name);
                var deleteButtonEl = $("<button>");
                deleteButtonEl.attr("data-event_id", data[data.tiers[i].name][j].event_id);
                deleteButtonEl.attr("data-tier_id", data.tiers[i].tier_id);
                deleteButtonEl.attr("class", "year-button delete mx-auto");
                deleteButtonEl.text("x");
                var rowEl = $("<div>");
                rowEl.attr("class", "row mx-auto text-center");
                rowEl.append(itemInputEl);
                rowEl.append(deleteButtonEl);
                containerEl.append(rowEl);
            }
            var pAddEl = $("<p>");
            pAddEl.attr("class", "item-title mx-auto");
            pAddEl.text("Add New Event");
            containerEl.append(pAddEl);
            var selectEventEl = $("<select>");
            selectEventEl.attr("id", `year-add-event-select-${data.tiers[i].tier_id}`);
            selectEventEl.attr("data-id", data.tiers[i].tier_id);
            for (let k = 0; k < data.allEvents.length; k++) {
                var optionEl = $("<option>");
                optionEl.attr("value", data.allEvents[k].id);
                optionEl.text(data.allEvents[k].name);
                selectEventEl.append(optionEl);
            }
            containerEl.append(selectEventEl);
            var addEventButtonEl = $("<button>");
            addEventButtonEl.attr("class", "button year-add-event-button");
            addEventButtonEl.attr("data-id", data.tiers[i].tier_id);
            addEventButtonEl.text("Add Event");
            containerEl.append(addEventButtonEl);
            main.append(containerEl);
        }
    }

});