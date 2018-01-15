const settings = require("../settings");
const fs = require('fs');
const { spawn } = require('child_process');
const EventEmitter = require('events');

class ChangeEmitter extends EventEmitter { }
const changeEmitter = new ChangeEmitter();

var songQueue = [];
//this is alot more about checking to start a new play process
var currentSong = null;
// play: Takes a song object and creates a promise around it, that wraps a child process which plays its argument. calls cbs after song done or error.
var startTime = Date.now();
const handler = function() {
  //This function knows what's up. check if there is a current song playing, if so then nothing, otherwise, call nextSong
  if (!currentSong) {
    nextSong(null);
  }
}

const nextSong = function(msg) {
  if (msg) {
    console.log(msg);
  }
  if (msg === 'reset') {
    //the current song is already being played
    play(currentSong)
      .then(nextSong)
      .catch(errorHandler);
    changeEmitter.emit('change');
  }
  //this handler is only called if the play promise has ended so we can make some assumptions.
  else if (songQueue.length > 0) {
    var song = pop();
    currentSong = song;
    //there has been a change in state of the Queue. 
    
    changeEmitter.emit('change');
    //start a new play function toolchain.
    play(song)
    .then(nextSong)
    .catch(errorHandler);

  } else {
    //there has been a change in state of the Queue. 
    currentSong = null;
    changeEmitter.emit('change');
  }
}

const errorHandler = function(err) {
  currentSong = null;
  changeEmitter.emit('change');
  console.error(err);
}

const play = function(songObject) {
  return new Promise((resolve, reject) => {
    songPath = songObject.path;
    command = settings.scriptPath + " " + songPath;
    command = "/home/alvareza/Desktop/tail"; //testing on angel's pc
    console.log("PLAYER: Executing command: " + command);

    var child = spawn(command);
    //start the timer
    startTime = Date.now();
    //Add listeners for child process
    child.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    child.stderr.on('data', function (data) {
      child.kill();
      reject(data.toString());
    });
    child.on('error', function (err) {
      child.kill();
      reject(err);
    });
    child.on('exit', function (code, signal) {
      if (!signal) {
        //Process ended gracefully
        resolve(code);
      }
    });
    //Add listeners for events on changeEvent
    var reseter = function() {
      child.kill();
      changeEmitter.removeListener('reset', reseter);
      //console.log(changeEmitter.listenerCount('reset'));   //BUG: LISTENERS ARE ALL REMOVED, BUT GET CALLED A bunch of times?
      resolve('reset');
    }
    var skipper = function () {
      child.kill();
      changeEmitter.removeListener('skip', skipper);
      //console.log(changeEmitter.listenerCount('skip'));   //BUG: LISTENERS ARE ALL REMOVED, BUT GET CALLED A bunch of times?
      resolve('Skipped current song');
    }

    changeEmitter.on('reset', reseter);

    changeEmitter.on('skip', skipper);
  });
}

const push = function(songName) {
  var song = settings.songs[songName];
  if (song) {
    songQueue.push(song);
  }
}
const pop = function() {
  return songQueue.shift();
}

module.exports.time = function() {
  deltaT = Date.now() - startTime;
  return deltaT;
}

module.exports.add = function(songName) {
  push(songName);
  handler();
};


module.exports.remove = function (songIndex) {
  if (songIndex >= 0 && songIndex < songQueue.length) {
    songQueue.splice(songIndex,1);
  }
  handler();
};

module.exports.restart = function() {
  changeEmitter.emit('reset');
  handler();
};

module.exports.skip = function() {
  changeEmitter.emit('skip');
  handler();
};

module.exports.queueLength = function() {
  return songQueue.length;
  handler();
};

module.exports.getQueue = function () {
  return songQueue;
  handler();
};

module.exports.getCurrent = function() {
  return currentSong;
  handler();
};

module.exports.on = function (event, callback) {
  changeEmitter.on(event, callback);
};

