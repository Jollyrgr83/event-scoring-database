$(() => {
    getAll();

    $(document).on("click", ".button", (event) => {
        var ID = $(event.target).attr("id");
    });

    $(document).on("change", "#year-select", (event) => {
        getAll();
    });

    $(document).on("change", "#report-select", (event) => {

    });

    $(document).on("change", "#event-select", (event) => {

    });

    function getAll() {
        $.get("/api/report/all/" + parseInt($("#year-select").val()), (data) => {
            console.log("data:", data);
        });
    }
});