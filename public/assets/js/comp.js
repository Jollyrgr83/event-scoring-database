$(() => {
    $(document).on("click", ".button", (event) => {
        var ID = $(event.target).attr("id");
        console.log("test", $("#unknown").val());
        if (ID === "year-update-button") {
            $("#view-section").attr("class", "main-container mx-auto text-center show");
            $("#add-section").attr("class", "main-container mx-auto text-center show");
            renderCompPage();
        }
        else if (ID === "comp-save-button") {
            $.ajax("/api/comp/update/", {
                type: "PUT",
                data: {
                    id: parseInt($(event.target).attr("data-id")),
                    comp_number: $("#comp-number").val().trim(),
                    first_name: $("#first-name").val() === undefined ? null : $("#first-name").val().trim(),
                    last_name: $("#last-name").val() === undefined ? null : $("#last-name").val().trim(),
                    team_name: $("#team-name").val() === undefined ? null : $("#team-name").val().trim(),
                    group_names: $("#group-names").val() === undefined ? null : $("#group-names").val().trim()
                }
            }).then((data) => {
                var textEl = $("<p>");
                textEl.attr("class", "item-title");
                textEl.text(`Success! Changes Saved!`);
                $("#view-dynamic-comp-info").append(textEl);
            })
        }
        else if (ID === "comp-delete-button") {
            $.ajax("/api/comp/", {
                type: "DELETE",
                data: {
                    id: parseInt($(event.target).attr("data-id"))
                }
            }).then((data) => {
                renderCompPage();
            });
        }

    });

    $(document).on("change", "#comp-select", (event) => {
        renderCompInfo();
    });

    function renderCompPage() {
        getCompData();
    }

    function getCompData() {
        $.get("/api/comp/" + parseInt($("#year-select").val()), (data) => {
            renderCompSelectionMenu(data);
            renderCompInfo();
        });
    }
    
    function renderCompSelectionMenu(data) {
        $("#view-dynamic-comp-select").empty();
        var menuEl = $("<select>");
        menuEl.attr("id", "comp-select");
        for (let i = 0; i < data.length; i++) {
            var optionEl = $("<option>");
            optionEl.attr("value", data[i].id);
            optionEl.attr("data-type", data[i].team);
            optionEl.text(data[i].text);
            menuEl.append(optionEl);
        }
        $("#view-dynamic-comp-select").append(menuEl);
    }

    function renderCompInfo() {
        $.get("/api/comp/compID/" + parseInt($("#comp-select").val()), (data) => {
            if (data.team === 0) {
                renderIndividual(data);
            }
            else {
                renderTeam(data);
            }
        });
    }
    
    function renderTeam(data) {
        $("#view-dynamic-comp-info").empty();
        var compNumberTitleEl = $("<p>");
        compNumberTitleEl.attr("class", "item-title mx-auto");
        compNumberTitleEl.text("Competitor Number");
        var compNumberEl = $("<input>");
        compNumberEl.attr("id", "comp-number");
        compNumberEl.attr("value", data.comp_number);
        var teamNameTitleEl = $("<p>");
        teamNameTitleEl.attr("class", "item-title mx-auto");
        teamNameTitleEl.text("Team Name");
        var teamNameEl = $("<input>");
        teamNameEl.attr("id", "team-name");
        teamNameEl.attr("value", data.team_name);
        var groupNamesTitleEl = $("<p>");
        groupNamesTitleEl.attr("class", "item-title mx-auto");
        groupNamesTitleEl.text("Group Names");
        var groupNamesEl = $("<input>");
        groupNamesEl.attr("id", "group-names");
        groupNamesEl.attr("value", data.group_names);
        var saveButtonEl = $("<button>");
        saveButtonEl.attr("id", "comp-save-button");
        saveButtonEl.attr("data-id", data.id);
        saveButtonEl.attr("class", "button");
        saveButtonEl.text("Save Changes");
        var delButtonEl = $("<button>");
        delButtonEl.attr("id", "comp-delete-button");
        delButtonEl.attr("class", "button");
        delButtonEl.attr("data-id", data.id);
        delButtonEl.attr("style", "background-color: red; border: solid 2px red;");
        delButtonEl.text("Delete Competitor");
        $("#view-dynamic-comp-info").append(compNumberTitleEl);
        $("#view-dynamic-comp-info").append(compNumberEl);
        $("#view-dynamic-comp-info").append(teamNameTitleEl);
        $("#view-dynamic-comp-info").append(teamNameEl);
        $("#view-dynamic-comp-info").append(groupNamesTitleEl);
        $("#view-dynamic-comp-info").append(groupNamesEl);
        $("#view-dynamic-comp-info").append(saveButtonEl);
        $("#view-dynamic-comp-info").append(delButtonEl);
    }
    
    function renderIndividual(data) {
        $("#view-dynamic-comp-info").empty();
            var compNumberTitleEl = $("<p>");
            compNumberTitleEl.attr("class", "item-title mx-auto");
            compNumberTitleEl.text("Competitor Number");
            var compNumberEl = $("<input>");
            compNumberEl.attr("id", "comp-number");
            compNumberEl.attr("value", data.comp_number);
            var firstNameTitleEl = $("<p>");
            firstNameTitleEl.attr("class", "item-title mx-auto");
            firstNameTitleEl.text("First Name");
            var firstNameEl = $("<input>");
            firstNameEl.attr("id", "first-name");
            firstNameEl.attr("value", data.first_name);
            var lastNameTitleEl = $("<p>");
            lastNameTitleEl.attr("class", "item-title mx-auto");
            lastNameTitleEl.text("Last Name");
            var lastNameEl = $("<input>");
            lastNameEl.attr("id", "last-name");
            lastNameEl.attr("value", data.last_name);
            var saveButtonEl = $("<button>");
            saveButtonEl.attr("id", "comp-save-button");
            saveButtonEl.attr("data-id", data.id);
            saveButtonEl.attr("class", "button");
            saveButtonEl.text("Save Changes");
            var delButtonEl = $("<button>");
            delButtonEl.attr("id", "comp-delete-button");
            delButtonEl.attr("class", "button");
            delButtonEl.attr("data-id", data.id);
            delButtonEl.attr("style", "background-color: red; border: solid 2px red;");
            delButtonEl.text("Delete Competitor");
            $("#view-dynamic-comp-info").append(compNumberTitleEl);
            $("#view-dynamic-comp-info").append(compNumberEl);
            $("#view-dynamic-comp-info").append(firstNameTitleEl);
            $("#view-dynamic-comp-info").append(firstNameEl);
            $("#view-dynamic-comp-info").append(lastNameTitleEl);
            $("#view-dynamic-comp-info").append(lastNameEl);
            $("#view-dynamic-comp-info").append(saveButtonEl);
            $("#view-dynamic-comp-info").append(delButtonEl);
    }
});