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
    });
});

// post routes
// year-setup:
// add tier - update db first, then pull from db, and build screen using handlebars? (need partials)