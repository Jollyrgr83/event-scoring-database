$(() => {
    $(".button").on("click", (event) => {
        var ID = $(event.target).attr("id");
        console.log("ID: ", ID);
        var routes = {
            "home": "/",
            "comp": "/competitor-entry",
            "year": "/year-setup",
            "score": "/score-entry"
        };
        if (routes[ID]) {
            window.location.href = routes[ID];
        }
    });
});