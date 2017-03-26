//background-image: url(https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg);
var harr = [];
var sarr = [];
var bool = true;
var now = new Date().getTime();
console.log(now);
var yule;
var leet;
var yeet;
var heart;
var step;
var taken = false;
var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];

for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}
select_language.selectedIndex = 6;
updateCountry();
select_dialect.selectedIndex = 6;
showInfo('info_start');

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        console.log(final_transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    leet = final_transcript;
    yeet = interim_transcript;
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  };
}
var keywords = {
  alexa: ['alexa', 'alexis', 'amazon', 'echo', 'dot'],
  pills: ['when', 'pills', 'medication'],
  greeting: ['hello', 'hi', "how's it", 'update'],
  joke: ['funny', 'joke', 'laugh', 'happy'],
  compassion: ['sad', 'hurt', 'upset', 'mad']
}
var keys2 = {
  alexa: ['I love Alexa! Stay tuned for my more alexa based features!'],
  pills: ['You were in general perscribed pills to be taken every day at 8:30 am!'],
  greeting: ['I hope the day is going well for you', 'how has your day been?'],
  joke: ['I have this funny old story about how I won a competition and a new bed', 'just say yes to the wilson companion A I. Just do it'],
  compassion: ['I hope you are not feeling down today'],
  "I'm sorry, could you please repeat that?": ['say again?']
}
var gfk = [
  'Did you know that the senior population jumped 15.1% from the turn of the century to 2010?',
  '43% of seniors report feeling lonely on a regular basis.',
  `Between 2000 and 2050, the proportion of the world's population over 60 years will double from about 11% to 22%. The absolute number of people aged 60 years and over is expected to increase from 605 million to 2 billion over the same period.`,
  'Globally, life expectancy at birth is projected to rise from 70 years in 2010-2015 to 77 years in 2045-2050 and to 83 years in 2095-2100.'
]
$('#submit_response').click(() => {
  textParse();
  console.log(holder);
  if(holder != `I'm sorry, could you please repeat that?`){
    responsiveVoice.isPlaying() ? null : responsiveVoice.speak(keys2[holder][0]);
  }
holder = `I'm sorry, could you please repeat that?`;});
setInterval(() => {
  responsiveVoice.isPlaying() ? null : responsiveVoice.speak(gfk[Math.floor(Math.random() * 3)]);
}, 150000)
var holder = `I'm sorry, could you please repeat that?`;
var textParse = () => {
  var obj = {};
  for (var x in keywords){
    keywords[x].map(y => {
      var reg = new RegExp (y, 'ig');
      reg.test(leet) ? obj[x] = 1 : null;
    })
  }
  for (var w in obj){
    obj[w] === 1 ? holder = w : holder = holder;
  }
  return holder;
}
function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}
setInterval(() => {
  if(heart >= 140 && taken === false){
    responsiveVoice.speak('Your heart rate is unusually high for your current level of activity and cardiac history. I have contacted all three of your emergency contacts for immediate assistance.');
    $.getJSON('http://8585b7a9.ngrok.io/panic', (data) => {});
    taken = true;
  }
}, 4000);
setInterval(() => {
  responsiveVoice.isPlaying() ? null : responsiveVoice.speak(walkHealth());
}, 350000);
setInterval(() => {
  responsiveVoice.isPlaying() ? null : responsiveVoice.speak(heartHealth());
}, 480000);
var walkHealth = () => {
  return steps > 0 ? `you're doing a great job! Keep it up! Lately you have been walking more than your average` : `Lately you have been somewhat sedentary. Maybe it is best for you to get up and move aroud a bit to stay healthy!`;
};

var heartHealth = () => {
  return heart > 135 ? `how have you been lately? Remember, I can contact anybody on your behalf. You seem very stressed lately, and your heart rate has been much higher than normal` : `you've been so calm lately! we should call the grandkids and let them know how well a healthy heart has served you!`;
};

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
}
responsiveVoice.setDefaultVoice("US English Female");
setTimeout(() => {responsiveVoice.speak("Hello Gertrude, and good morning. You have not taken your medicine yet today");captionText("Hello Gertrude, and good morning. You have not taken your medicine yet today");},5000);
$(document).ready(() => {
$('#hr').click(() => {
  $('#hg').html('<div id="chartcontainer" style="margin-left: 13vw;">Prediction Graph</div>');
  var myData = new Array(harr[0], harr[1], harr[2], harr[3], harr[4]);
  console.log(myData);
  var myChart = new JSChart('chartcontainer', 'line');
              myChart.setDataArray(myData);
              myChart.draw();
})
$('#sr').click(() => {
  $('#sg').html('<div id="chartcontainer2" style="margin-left: 13vw;">Prediction Graph</div>');
  var myData = new Array(sarr[0], sarr[1], sarr[2], sarr[3], sarr[4]);
  console.log(myData);
  var myChart = new JSChart('chartcontainer2', 'line');
              myChart.setDataArray(myData);
              myChart.draw();
})
var umm;
  $.fn.equalizerAnimation = function(speed){
    var $equalizer = $(this);
    setInterval(function(){
        $equalizer.find('span').eq(0).css({height:randomBetween(20,40)+'px'});
        $equalizer.find('span').eq(1).css({height:randomBetween(30,70)+'px'});
        $equalizer.find('span').eq(2).css({height:randomBetween(40,80)+'px'});
        $equalizer.find('span').eq(3).css({height:randomBetween(30,80)+'px'});
        $equalizer.find('span').eq(4).css({height:randomBetween(30,60)+'px'});
    },speed);
        umm = () => {$equalizer.toggleClass('paused')};
}
$('.equalizer').equalizerAnimation(180);

function randomBetween(min, max) {
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }else {
        return min + Math.random() * max;
    }
}
$.getJSON('https://cors-anywhere.herokuapp.com/' + 'http://2e4a8b66.ngrok.io', (data) => {
  console.log(data);
  $('#HeartRate').html(data.heartRate);
  heart = data.heartRate;
  harr.push([`${now}`, data.heartRate]);
  $('#steps').html(data.stepCount);
  steps = data.stepCount;
  sarr.push([`${now}`, data.stepCount]);
  });
  setInterval(() => {$.getJSON('https://cors-anywhere.herokuapp.com/' + 'http://2e4a8b66.ngrok.io', (data) => {
    var noww = new Date().getTime();
    heart = data.heartRate;
    harr.push([`${noww}`, data.heartRate]);
    steps = data.stepCount;
    sarr.push([`${noww}`, data.stepCount]);
      if(harr.length > 5){
        harr.shift();
        sarr.shift();
      }
    })
  }, 10000);
  setInterval(() => {$.getJSON('https://cors-anywhere.herokuapp.com/' + 'http://2e4a8b66.ngrok.io', (data) => {
    console.log(data);
    $('#HeartRate').html(data.heartRate);
    $('#steps').html(data.stepCount);
    });
  }, 10000);

  setInterval(() => {
    if(bool !== responsiveVoice.isPlaying()) {
      umm();
      bool = responsiveVoice.isPlaying();
    }
  }, 750);


});

var captionText = (txt) => {
  $('cap').html(txt);
    if(bool !== responsiveVoice.isPlaying()){
      $('cap').empty();
    }
};
