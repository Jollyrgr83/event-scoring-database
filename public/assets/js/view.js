$(() => {
    $(document).on("click", ".button", (event) => {
        var ID = $(event.target).attr("id");
        console.log("ID: ", ID);
        if (ID === "view-menu-button") {
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
                    var titleName = $("#view-menu").val();
                    getView(titleName);
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
                    var titleName = $("#view-menu").val();
                    getView(titleName, "update");
                }
            });
        }
        
    });

    function getView(titleName, status) {
        console.log("titleName", titleName);
        const dataObj = {
            titleName: titleName,
            tableName: titleName.toLowerCase(),
            status: status
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
        if (dataObj.status === "update") {
            var textEl = $("<p>");
            textEl.attr("class", "item-title");
            textEl.text(`Success! Item Updated!`);
            $("#view-container").append(textEl);
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
                var titleName = $("#view-menu").val();
                getView(titleName);
                var textEl = $("<p>");
                textEl.attr("class", "item-title");
                textEl.text(`Success! Item Added!`);
                $("#add-container").append(textEl);
            });
        }
    }
});