$( document ).ready(function() {

    $(".pause-icon").hide();
    $(".stop-icon").hide();

    let playing = null;
    var msg = null;

    //Event handler for stopping all speech
    $(".stop-all").on('click', function() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            $('.play-icon').show();
            $('.pause-icon').hide();
            $('.stop-icon').hide();
            playing = null;
        }
    });
    
    $('#volumeForm').on('change', function() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            $('.play-icon').show();
            $('.pause-icon').hide();
            $('.stop-icon').hide();
            playing = null;
        }
    });

    //Event handler for playing speech
    $(".play-icon").on('click', function() {
        if ('speechSynthesis' in window) {
            if(speechSynthesis.paused && playing ==  $(this).siblings('.article-title').text()) {
                speechSynthesis.resume();

                //Change icons being displayed
                $(this).siblings('.pause-icon').show();
                $(this).hide();
            } else {
                // Cancel previous speechSysthesis
                speechSynthesis.cancel();

                // Speech Synthesis supported 🎉
                var text = $(this).siblings('.article-title').text() + ". " + $(this).siblings('.article-source').text() + $(this).siblings('.article-text').text();
                var msg = new SpeechSynthesisUtterance();
                msg.text = text;
                msg.rate = 0.8;
                msg.lang = 'en-US';
                msg.pitch = 0.2;
                msg.volume = $('#volumeForm').val();

                speechSynthesis.speak(msg);

                //Set playing object
                playing = $(this).siblings('.article-title').text();

                //Change icons being displayed
                $('.play-icon').show();
                $('.pause-icon').hide();
                $('.stop-icon').hide();
                $(this).siblings('.pause-icon').show();
                $(this).siblings('.stop-icon').show();
                $(this).hide();
            }    
        } else {
             // Speech Synthesis Not Supported 😣
             alert("Sorry, your browser doesn't support this text to speech functionality.");
        }
    });
    //Event handler for search form
    $(".pause-icon").on('click', function() {
        if ('speechSynthesis' in window) {
            // Cancel previous speechSysthesis
            speechSynthesis.pause();

            //Change icons being displayed
            $(this).siblings('.play-icon').show();
            $(this).hide();
    
        } else {
            // Speech Synthesis Not Supported 😣
            alert("Sorry, your browser doesn't support this text to speech functionality.");
        }
    });
    //Event handler for search form
    $(".stop-icon").on('click', function() {
        if ('speechSynthesis' in window) {
            // Cancel previous speechSysthesis
            speechSynthesis.cancel();

            //Change icons being displayed
            $('.play-icon').show();
            $('.stop-icon').hide();
            $('.pause-icon').hide();
        } else {
            // Speech Synthesis Not Supported 😣
            alert("Sorry, your browser doesn't support this text to speech functionality.");
        }
    });

    
});