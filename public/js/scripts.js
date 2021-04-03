$( document ).ready(function() {
    //Hide the div indicating no results were found
    $(".no-results-found").hide()
    
    //Event handler for search form
    $("#searchForm").on('input', function() {
        $(".no-results-found").hide()
        //Compare input search with all article entries and hides the ones without a match
        var strSearch = $("#searchForm").val().toLowerCase();
        var hidden = 0;
        $(".grid-item").each(function( index ) {
            if($(this).text().toLowerCase().indexOf(strSearch) == -1){
                hidden++;
                $(this).hide();
            } else {
                $(this).show();
            }
        });
        if(hidden == $(".col-3").length) {
            $(".no-results-found").show()
        }

        $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            horizontalOrder: true,
            gutter: 0, 
            columns: 4,
            transitionDuration: '0.5s'
            
        });
        // $('.grid').masonry('layout').masonry();
    });
    // Set masonry layout
    $('.grid').masonry({
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-sizer',
        // do not use .grid-sizer in layout
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true,
        gutter: 0, 
        columns: 4,
        transitionDuration: '0.5s'
    });
    
});