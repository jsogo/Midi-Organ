const settings = require("../settings");
const fs = require('fs');
let exec = require('child_process').exec;

var currentSong = settings.songs['song2'];
var songQueue = [settings.songs['song1'], settings.songs['song3'], settings.songs['song4'], settings.songs['song2']];
var currentProcess = null;

/* I want the executor code to look something like this:

Spawn returns a childObject, which you can then listen for events with. The events are:

Class: ChildProcess
Event: 'error'
Event: 'exit'
Event: 'close'
Event: 'disconnect'
Event: 'message'
There are also a bunch of objects from childObject, they are:

Class: ChildProcess
child.stdin
child.stdout
child.stderr
child.stdio
child.pid
child.connected
child.kill([signal])
child.send(message[, sendHandle][, callback])
child.disconnect()


var spawn = require('child_process').spawn;
var child = spawn('node ./commands/server.js');
child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    //Here is where the output goes
});
child.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
    //Here is where the error output goes
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
    //Here you can get the exit code of the script
});

*/

update = function() {
  command = settings.scriptPath + currentSong[path] + " &> ./web/current.out";
 
}

getNextSong = function() {
  return songQueue.shift();
};

module.exports.add = function(songName) {
  var song = settings.songs[songName];
  if (song) {
    if (currentSong) {
      songQueue.push(song);
    } else {
      currentSong = song;
    }
    console.log("Added a new song to the queue");
  }
};

module.exports.remove = function (songIndex) {
  if (songIndex >= 0 && songIndex < songQueue.length) {
    songQueue.splice(songIndex,1);
    console.log("Removed a song at " + songIndex);
  }
};

module.exports.restart = function() {
  //kill current process, and reinitialize the command
  console.log("Restarted current song.");
};

module.exports.skip = function() {
  //kill current process and set the current song to the next song
  currentSong = getNextSong();
  console.log("Skipped current song.");
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