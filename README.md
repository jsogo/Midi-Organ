# Midi-Organ
### What is this?
This is a Pipe Organ which Interprets and plays MIDI files. The software is running on a Raspberry Pi 3 Model B. 
We are implementing support for a CLI (command line interface), and a web interface running on a NodeJS express server. 


### CLI setup
1. Make sure to have cloned this REPO `git clone https://github.com/jsogo/Midi-Organ.git`
<<<<<<< HEAD
2. You probably want to build the C++ code, if we haven't included the assembled version
   (run the command g++ -std=c++11 -o midiorgan main.cpp timing.cpp track.cpp)
=======
2. You probably want to recompile the C++ code, if you're not using gcc-6.3 for the Pi -- in this case you'll 
   also need to recompile the midi parsing library, from `git clone https://github.com/craigsapp/midifile`
   (for our code, run `g++ -std=c++11 -o midiorgan main.cpp timing.cpp track.cpp -L../libs/ -lmidifile -lwiringPi -I../include`) 
3. You'll probably want to add the command to your PATH variables, or we might just have it run from the web

### Web Server Setup
1. Make sure to have cloned this REPO `git clone https://github.com/jsogo/Midi-Organ.git`
2. Navigate to the the `/web` folder in this REPO
3. run `npm install` from the `/web` folder, this installs all the necessary libraries
4. to start the server, run `npm start`
