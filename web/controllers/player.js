const settings = require("../settings");
const fs = require('fs');
var execFile = require('child_process').execFile;

var songQueue = [];

var push = function(songName) {
  var song = settings.songs[songName];
  if (song) {
    songQueue.push(song);
  }
}
var pop = function() {
  return songQueue.shift();
}

var currentSong = null;
var currentProcess = null;

var executor = function() {
  //run command
  //Attempt to find song 
    songPath =currentSong.path;
    command = settings.scriptPath + " " + songPath;
    command = "/home/alvareza/Desktop/tail"; //testing on angel's pc
    console.log("Executing: " + command);
    try {
      var child = execFile(command, (err, stdout, sterr) => {
        if (err) {
          handler(true, false, err);
        } else if (stderr) {
          handler(true, false, stderr);     // just print on data
        } else if (stdout) {
          handler(true, false, stdout);     // just print on data
        } else {
          handler(true, false, "Finished Program");;
        }

      });

      return child;
    } catch (err) {
      handler(true, false, "Could not play " + currentSong.title + ". " + err);
      return null;
    }
};
//current song will only be put up IFF there is literally a song playing
var handler = function(skip=false, restart=false, msg='') {
  if (msg) {
    console.log("HANDLER: " + msg);
  }
  if (skip) {
    currentSong = null;
    if (currentProcess) {
      currentProcess.kill();
      currentProcess = null;
    }
  }
  if (currentSong) {
    if (restart) {
      if (currentProcess) {
        currentProcess.kill();
        currentProcess = null;
      }
      currentProcess = executor();
    } 
  } else {
    if (songQueue.length > 0) {
      currentSong = pop();
      console.log("Now Playing: " + currentSong.title);
      if (currentProcess) {
        currentProcess.kill();
        currentProcess = null;
      }
      currentProcess = executor();
    }
  }
}

module.exports.add = function(songName) {
  push(songName);
  handler(false, false, "Added a new song to the queue");
};


module.exports.remove = function (songIndex) {
  if (songIndex >= 0 && songIndex < songQueue.length) {
    songQueue.splice(songIndex,1);
  }
  handler(false, false,"Removed a song at " + songIndex)
};

module.exports.restart = function() {
  //kill current process, and reinitialize the command
  handler(false, true, "Restart current song.");
};

module.exports.skip = function() {
  //kill current process and set the current song to the next song
  handler(true, false, "Skipped current song.");
};

module.exports.queueLength = function() {
  return songQueue.length;
};

module.exports.getQueue = function () {
  return songQueue;
};

module.exports.getCurrent = function() {
  return currentSong;
};
