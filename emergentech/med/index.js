$(document).ready(() => {
  $.getJSON('https://cors-anywhere.herokuapp.com/' + 'http://2e4a8b66.ngrok.io', (data) => {
  console.log(data);
  $('#heart').html(data.heartRate);
  $('#stepss').html(data.stepCount);
  });
  setInterval(() => {
    $.getJSON('https://cors-anywhere.herokuapp.com/' + 'http://8585b7a9.ngrok.io', (data) => {
      data.panic === true ? alert('Jill, one of your patients, requires urgent attention.') : null;
    })
  }, 10000)
  setInterval(() => {$.getJSON('https://cors-anywhere.herokuapp.com/' + 'http://2e4a8b66.ngrok.io', (data) => {
  console.log(data);
  $('#heart').html(data.heartRate);
  $('#stepss').html(data.stepCount);
  });
}, 60000);

})
