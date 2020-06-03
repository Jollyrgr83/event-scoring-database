$(() => {
    $(document).on("click", ".button", (event) => {
        var ID = $(event.target).attr("id");
    });
});