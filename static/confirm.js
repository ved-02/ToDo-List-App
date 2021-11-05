$( document ).ready(function() {
    console.log( "ready!" );
    $(".reset").click(function () {
        let b = confirm("It will reset all remaining as well as completed task.");
        return b;
    });
});