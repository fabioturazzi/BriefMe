$( document ).ready(function() {
    $("#searchForm").on('input', function() {
        var strSearch = $("#searchForm").val().toLowerCase();

        $( ".col-3" ).each(function( index ) {
            if($(this).text().toLowerCase().indexOf(strSearch) == -1){
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
});