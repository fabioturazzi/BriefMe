$( document ).ready(function() {
    //Event handler for search form
    $("#searchForm").on('input', function() {
        //Compare input search with all article entries and hides the ones without a match
        var strSearch = $("#searchForm").val().toLowerCase();
        $(".col-3").each(function( index ) {
            if($(this).text().toLowerCase().indexOf(strSearch) == -1){
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    //Event to filter articles for given sources
    $(".nav-sources").click(function() {
        //Check if no filters are previously applied and hide all articles 
        if($(".source-nav-active.nav-allsources").length) {
            $(".col-3").hide();
        }
        //Iterate through articles and unhide/hide those that match the current filter being applied/removed 
        $(".col-3").each(function( index ) {
            if($(event.target).hasClass("source-nav-active")) {
                if($(this).find(".article-source").text() == $(event.target).text()){
                    $(this).hide();
                    $(this).removeClass("article-active");
                }
            } else {
                if($(this).find(".article-source").text() == $(event.target).text()){
                    $(this).show();
                    $(this).addClass("article-active");
                }
            }
        });
        //Adjust the class for the source filter
        if($(event.target).hasClass("source-nav-active")) {
            $(event.target).removeClass("source-nav-active");
        } else {
            $(event.target).addClass("source-nav-active");
        }
        //If all active filters were removed, add active status back to all sources
        if($(".source-nav-active").length == 0) {
            $(".nav-allsources").addClass("source-nav-active");
            $(".col-3").show();
        } else {
            $(".nav-allsources").removeClass("source-nav-active");
        }
    });

    //Event to filter articles for given sources
    $(".nav-allsources").click(function() {
        $(".col-3").show();
        //Check if no filters are previously applied and hide all articles 
        if(!$(".nav-allsources").hasClass("source-nav-active")) {
            $(".nav-allsources").addClass("source-nav-active");
        }
         //Iterate through articles and remove unactive status 
        $(".col-3").each(function( index ) {
            $(this).removeClass("article-active");
        });
        //Iterate through articles and remove unactive status 
        $(".nav-sources").each(function( index ) {
            $(this).removeClass("source-nav-active");
        });
    });
});