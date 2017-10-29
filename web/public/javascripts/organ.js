var queue = null;
var current = null;

const songTitleElem = $('#song-title');
const numSongsElem = $('#num-songs');
const queueElem = $('#queue');
const songLengthElem = $('#song-length');

var appendQueue = function(song, i) {
  var html = `
        <h2 class="ui header" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
          Title:&nbsp;<span id="queue-title-${i}">${song['title']}</span>
          <button class="ui right floated red button" onclick="remove_song(${i})">Remove from Queue</button>
          <br>
          Length:&nbsp;
            <span id="queue-length-1">${new Time(song['length']).toString()}</span>
        </h2>
        <div class="ui divider"></div>
        `

  queueElem.append(html);
};

function Time(duration) {  //duration in seconds
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


var getQueue = function() {
  //get queue from AJAX and perform some updates
  return $.ajax({
    url:"/organ/queue",
    method:"GET",
    data:null,
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("Failed to Retrieve Queue from server");
    },
    success: function(data, textStatus, jqXHR) {
      //populate with data
      queue = data['queue'];        //TODO: UPDATE HBS FROM SETTINGS SONGS, UPDATE TIMING FOR CURRENT SONG
      current = data['current'];
      if (current) {
        songTitleElem.text("Currently Playing: " + current['title']);
      } else {
        songTitleElem.text("No song currently playing");
      }
      if (queue.length === 1) {
        numSongsElem.text('1 song');
      } else {
        numSongsElem.text( ''+ queue.length +' songs');
      }

      //clear queue
      queueElem.text(' ');
      for (var i = 0; i < queue.length; i++) {
        appendQueue(queue[i], i);
      }
    }
  });
}

var timer = function (data) { //data is the stuff sent in the res.send
      var i = 0;
      var elapsed = new Time(0);
      var duration = new Time(current['length']);
      var song;
      songLengthElem.text(elapsed.toString() + "/" + duration.toString());
      var update = function () {
        songLengthElem.text(elapsed.toString() + "/" + duration.toString());
        i++;
        elapsed.setLength(i);
        if (i > current['length']) {
          clearInterval(song);
          //trigger another update after a second of waiting
          
        }
      }
      song = setInterval(update, 1000);
  };

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
  getQueue()
  .then(timer);



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
});