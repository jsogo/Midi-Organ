$(document).ready(function() {

  var socket = io();
  $('form').submit(function() {
    console.log('submitted a ' + $('#songChoice').dropdown('get value'));
    
    socket.emit('add song', $('#songChoice').dropdown('get value'));
    
    $('#songChoice').dropdown('restore defaults');
    return false;
  })
  socket.on('update', function(data) {
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
      numSongsElem.text('' + queue.length + ' songs');
    }
    queueElem.text(' ');
    for (var i = 0; i < queue.length; i++) {
      appendQueue(queue[i], i);
    }
  });

  socket.emit('get updates');
  
  $('#skip').click(function() {
    socket.emit('skip');
  });
  $('#restart').click(function() {
    socket.emit('restart');
  });

  var queue = null;
  var current = null;

  const songTitleElem = $('#song-title');
  const numSongsElem = $('#num-songs');
  const queueElem = $('#queue');
  const songLengthElem = $('#song-length');

  var appendQueue = function (song, i) {
    var idString = 'remove-' + i;
    var html = `
        <h2 class="ui header" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
          Title:&nbsp;<span id="queue-title-${i}">${song['title']}</span>
          <button class="ui right floated red button" id="${idString}">Remove from Queue</button>
          <br>
          Length:&nbsp;
            <span id="queue-length-1">${new Time(song['length']).toString()}</span>
        </h2>
        <div class="ui divider"></div>
      `
    $.when(queueElem.append(html))
    .then(function() {
      console.log("thenable");
      var id = "#" + idString;
      $(id).click(function () {
        socket.emit('remove song', i);
      });
    });
  };

  function Time(duration) {  //duration in seconds
    this.hours = Math.floor(duration / 3600);
    this.minutes = Math.floor((duration / 60) % 60);
    this.seconds = duration % 60

    this.setLength = function (length) {
      this.hours = Math.floor(length / 3600);
      this.minutes = Math.floor((length / 60) % 60);
      this.seconds = length % 60
    }

    this.getSeconds = function () {
      return this.seconds;
    }
    this.getMinutes = function () {
      return this.minutes;
    }
    this.getHours = function () {
      return this.hours;
    }
    this.toString = function () {
      var timeString = "";
      if (this.hours != 0) {
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


  var timer = function (data) { //data is the stuff sent in the res.send
    return new Promise((resolve, reject) => {
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
          resolve();
        }
      }
      song = setInterval(update, 1000);
    });
  };


  $('select.dropdown').dropdown({
    onChange: function (text, value) {
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

