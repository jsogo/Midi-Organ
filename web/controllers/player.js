const settings = require("../settings");
const fs = require('fs');
let exec = require('child_process').exec;

var currentSong = null;
var songQueue = [];
var currentProcess = null;

getNextSong = function() {
  return songQueue.shift();
};

module.exports.add = function(songName) {
  var song = settings.song[name];
  if (song) {
    songQueue.push(song);
    console.log("Added a new song to the queue");
  }
};

module.exports.remove = function(position) {
  if (songIndex >= 0 && songIndex < songQueue.length) {
    songQueue.splice(songIndex,1);
    res.send({ message: "Success" }); //also send update queue information
    console.log("Removed a song at " + position);
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