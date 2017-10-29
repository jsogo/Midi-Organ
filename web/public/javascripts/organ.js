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


var add = function () {
  console.log("Added");
};
var remove_song = function (num) {
  console.log("song " + num + " removed");
};
var skip = function () {
  console.log("current song skipped");
};
var restart = function () {
  console.log("current song restarted");
};

$(document).ready(function() {
  $('#song-title').text("Song Name");
  var length = 79;
  var i = 0;
  var elapsed = new Time(0);
  var duration = new Time(length);
  $('#song-length').text(elapsed.toString() + "/" + duration.toString());
  var update = function() {
    $('#song-length').text(elapsed.toString() + "/" + duration.toString());
    i++;
    elapsed.setLength(i);
  }

  var song = setInterval(update, 1000);

  $('select.dropdown').dropdown({
    onChange: function (text, value) {
      console.log(text);
      if (value !== "Select a Song") {
        $("#add-button").removeClass('disabled');
      } else {
        //check if a file has been downloaded, but we're not doing uploads for now
        $("#add-button").addClass('disabled')
      }
      $('select.dropdown').dropdown('set selected', value);
    }
  });


  $('#queue-length-1').text("1:45");
  $('#queue-title-1').text("Canon in D");
  $('#num-songs').text('1 song');
  // remove_song(num)
  // add()
  // skip()
  // restart()
});