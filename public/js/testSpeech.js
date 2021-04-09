jQuery(function($) {

    let app = $('#app');
  
    let SYNTHESIS = null;
    let VOICES = null;
  
    let QUOTE_TEXT = null;
    let QUOTE_PERSON = null;
  
    let VOICE_SPEAKING = false;
    let VOICE_PAUSED = false;
    let VOICE_COMPLETE = false;
  
    let iconProps = {
      'stroke-width': 1,
      'width': 48,
      'height': 48,
      'class': 'text-secondary d-none',
      'style': 'cursor: pointer'
    };
  
 // Gets the SVG markup for a Feather icon
function iconSVG(icon) {
    let props = $.extend(iconProps, { id: icon });
    return feather.icons[icon].toSvg(props);
  }
  
  // Shows an element
  function showControl(control) {
    control.addClass('d-inline-block').removeClass('d-none');
  }
  
  // Hides an element
  function hideControl(control) {
    control.addClass('d-none').removeClass('d-inline-block');
  }
  
  // Get the available voices, filter the list to have only English filters
  function getVoices() {
    // Regex to match all English language tags e.g en, en-US, en-GB
    let langRegex = /^en(-[a-z]{2})?$/i;
  
    // Get the available voices and filter the list to only have English speakers
    VOICES = SYNTHESIS.getVoices()
      .filter(function (voice) { return langRegex.test(voice.lang) })
      .map(function (voice) {
        return { voice: voice, name: voice.name, lang: voice.lang.toUpperCase() }
      });
  }
  
  // Reset the voice variables to the defaults
  function resetVoice() {
    VOICE_SPEAKING = false;
    VOICE_PAUSED = false;
    VOICE_COMPLETE = false;
  }
  function fetchNewQuote() {
    // Clean up the #app element
    app.html('');
  
    // Reset the quote variables
    QUOTE_TEXT = null;
    QUOTE_PERSON = null;
  
    // Reset the voice variables
    resetVoice();
  
    // Pick a voice at random from the VOICES list
    let voice = (VOICES && VOICES.length > 0)
      ? VOICES[ Math.floor(Math.random() * VOICES.length) ]
      : null;
  
    // Fetch a quote from the API and render the quote and voice controls
    $.get('/api/quote', function (quote) {
      renderQuote(quote.data);
      SYNTHESIS && renderVoiceControls(SYNTHESIS, voice || null);
    });
  }
  
  function renderQuote(quote) {
  
    // Create some markup for the quote elements
    let quotePerson = $('<h1 id="quote-person" class="mb-2 w-100"></h1>');
    let quoteText = $('<div id="quote-text" class="h3 py-5 mb-4 w-100 font-weight-light text-secondary border-bottom border-gray"></div>');
  
    // Add the quote data to the markup
    quotePerson.html(quote.title);
    quoteText.html(quote.content);
  
    // Attach the quote elements to the DOM
    app.append(quotePerson);
    app.append(quoteText);
  
    // Update the quote variables with the new data
    QUOTE_TEXT = quoteText.text();
    QUOTE_PERSON = quotePerson.text();
  
  }
  
  function renderVoiceControls(synthesis, voice) {

    let controlsPane = $('<div id="voice-controls-pane" class="d-flex flex-wrap w-100 align-items-center align-content-center justify-content-between"></div>');
  
    let voiceControls = $('<div id="voice-controls"></div>');
  
    // Create the SVG elements for the voice control buttons
    let playButton = $(iconSVG('play-circle'));
    let pauseButton = $(iconSVG('pause-circle'));
    let stopButton = $(iconSVG('stop-circle'));
  
    // Helper function to enable pause state for the voice output
    let paused = function () {
      VOICE_PAUSED = true;
      updateVoiceControls();
    };
  
    // Helper function to disable pause state for the voice output
    let resumed = function () {
      VOICE_PAUSED = false;
      updateVoiceControls();
    };
  
    // Click event handler for the play button
    playButton.on('click', function (evt) {});
  
    // Click event handler for the pause button
    pauseButton.on('click', function (evt) {});
  
    // Click event handler for the stop button
    stopButton.on('click', function (evt) {});
  
    // Add the voice controls to their parent element
    voiceControls.append(playButton);
    voiceControls.append(pauseButton);
    voiceControls.append(stopButton);
  
    // Add the voice controls parent to the controlsPane element
    controlsPane.append(voiceControls);
  
    // If voice is available, add the voice info element to the controlsPane
    if (voice) {
      let currentVoice = $('<div class="text-secondary font-weight-normal"><span class="text-dark font-weight-bold">' + voice.name + '</span> (' + voice.lang + ')</div>');
  
      controlsPane.append(currentVoice);
    }
  
    // Add the controlsPane to the DOM
    app.append(controlsPane);
  
    // Show the play button
    showControl(playButton);
  
  }
  playButton.on('click', function (evt) {
    evt.preventDefault();
  
    if (VOICE_SPEAKING) {
  
      // If voice is paused, it is resumed when the playButton is clicked
      if (VOICE_PAUSED) synthesis.resume();
      return resumed();
  
    } else {
  
      // Create utterances for the quote and the person
      let quoteUtterance = new SpeechSynthesisUtterance(QUOTE_TEXT);
      let personUtterance = new SpeechSynthesisUtterance(QUOTE_PERSON);
  
      // Set the voice for the utterances if available
      if (voice) {
        quoteUtterance.voice = voice.voice;
        personUtterance.voice = voice.voice;
      }
  
      // Set event listeners for the quote utterance
      quoteUtterance.onpause = paused;
      quoteUtterance.onresume = resumed;
      quoteUtterance.onboundary = updateVoiceControls;
  
      // Set the listener to activate speaking state when the quote utterance starts
      quoteUtterance.onstart = function (evt) {
        VOICE_COMPLETE = false;
        VOICE_SPEAKING = true;
        updateVoiceControls();
      }
  
      // Set event listeners for the person utterance
      personUtterance.onpause = paused;
      personUtterance.onresume = resumed;
      personUtterance.onboundary = updateVoiceControls;
  
      // Refresh the app and fetch a new quote when the person utterance ends
      personUtterance.onend = fetchNewQuote;
  
      // Speak the utterances
      synthesis.speak(quoteUtterance);
      synthesis.speak(personUtterance);
  
    }
  
  });
  
  pauseButton.on('click', function (evt) {
    evt.preventDefault();
  
    // Pause the utterance if it is not in paused state
    if (VOICE_SPEAKING) synthesis.pause();
    return paused();
  });
  
  stopButton.on('click', function (evt) {
    evt.preventDefault();
  
    // Clear the utterances queue
    if (VOICE_SPEAKING) synthesis.cancel();
    resetVoice();
  
    // Set the complete status of the voice output
    VOICE_COMPLETE = true;
    updateVoiceControls();
  });
  function updateVoiceControls() {

    // Get a reference to each control button
    let playButton = $('#play-circle');
    let pauseButton = $('#pause-circle');
    let stopButton = $('#stop-circle');
  
    if (VOICE_SPEAKING) {
  
      // Show the stop button if speaking is in progress
      showControl(stopButton);
  
      // Toggle the play and pause buttons based on paused state
      if (VOICE_PAUSED) {
        showControl(playButton);
        hideControl(pauseButton);
      } else {
        hideControl(playButton);
        showControl(pauseButton);
      }
  
    } else {
      // Show only the play button if no speaking is in progress
      showControl(playButton);
      hideControl(pauseButton);
      hideControl(stopButton);
    }
  
  }
  
  function initialize() {
    if ('speechSynthesis' in window) {
  
      SYNTHESIS = window.speechSynthesis;
  
      let timer = setInterval(function () {
        let voices = SYNTHESIS.getVoices();
  
        if (voices.length > 0) {
          getVoices();
          fetchNewQuote();
          clearInterval(timer);
        }
      }, 200);
  
    } else {
  
      let message = 'Text-to-speech not supported by your browser.';
  
      // Create the browser notice element
      let notice = $('<div class="w-100 py-4 bg-danger font-weight-bold text-white position-absolute text-center" style="bottom:0; z-index:10">' + message + '</div>');
  
      fetchNewQuote();
      console.log(message);
  
      // Display non-support info on DOM
      $(document.body).append(notice);
  
    }
  }
  
    initialize();
  
  });