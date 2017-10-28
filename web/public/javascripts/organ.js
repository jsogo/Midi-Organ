// takes a song duration in seconds
function Time(duration) {
  this.hours = Math.floor(duration/3600);
  this.minutes = Math.floor((duration/60) % 60);
  this.seconds = duration % 60

  this.setLength= function(length) {
    this.hours = Math.floor(length / 3600);
    this.minutes = Math.floor((length / 60) % 60);
    this.seconds = length % 60
  }

  this.getSeconds = function() {
    return this.seconds;
  }
  this.getMinutes = function() {
    return this.minutes;
  }
  this.getHours = function() {
    return this.hours;
  }
  this.toString = function() {
    var timeString = "";
    if ( this.hours != 0 ) {
      timeString = timeString + this.hours + ":";
    }
    timeString = timeString + this.minutes + ":";
    if (this.seconds <= 9) {
      timeString = timeString + "0" + this.seconds;
    } else {
      timeString = timeString + this.seconds;
    }
    return timeString;
  }
}

$(document).ready(function() {
  $('#song-title').text("Song Name");
  var length = 79;
  var i = 0;
  var elapsed = new Time(0);
  var duration = new Time(length);
  
  var update = function() {
    $('#song-length').text(elapsed.toString() + "/" + duration.toString());
    i++;
    elapsed.setLength(i);
  }

  var song = setInterval(update, 1000);

  $('select.dropdown').dropdown();


});