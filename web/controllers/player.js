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

const handler = function() {
  //This function knows what's up. check if there is a current song playing, if so then nothing, otherwise, call nextSong
  if (!currentSong) {
    nextSong(null);
  }
}

const nextSong = function(code) {
  //this handler is only called if the play promise has ended so we can make some assumptions.
  if (songQueue.length > 0) {
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

    //Add listeners for child process
    child.stdout.on('data', function (data) {
      console.log(data);
    });
    child.stderr.on('data', function (data) {
      child.kill();
      reject(data);
    });
    child.on('error', function (err) {
      child.kill();
      reject(err);
    });
    child.on('close', function (code) {
      resolve(code);
    });
    //Add listeners for events on changeEvent
    changeEmitter.on('reset',() => {
      child.kill();
      //instantiate new child until process comes to end, recursively.
      //TODO FIX THIS NOW
      play(songObject)
      .then(resolve)
      .catch(reject);
    });
    changeEmitter.on('skip', () => {
      child.kill();
      resolve('Skipped current song');
    });
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

/*


var executor = function() {
    songPath =currentSong.path;
    command = settings.scriptPath + " " + songPath;
    command = "/home/alvareza/Desktop/tail"; //testing on angel's pc
    console.log("EXECUTOR: Executing command: " + command);
    try {
      var child = spawn(command);

      child.stdout.on('data', function(data) {
        handler(false, false, data);
      });
      child.stderr.on('data', function(data) {
        handler(true, false, data);
      });
      child.on('error', function(err) {
        handler(true, false, "ERROR:" + command + " Finished with error: " + err);
      });
      child.on('close', function (code) {
        handler(true, false, "" + command + " Process finished with exit code: " + code);
      });

      return child;
    } catch (err) {
      console.log(err);
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
    }
  }

  if (currentSong) {
    if (restart) {
      if (currentProcess) {
        currentProcess.kill();
      }
      currentProcess = executor();
    }
  } else {
    if (songQueue.length > 0) {
      currentSong = pop();
      console.log("HANDLER: Now Playing: " + currentSong.title);
      if (currentProcess) {
        currentProcess.kill();
      }
      currentProcess = executor();
    }
  }
  changeEmitter.emit('change');
}
*/