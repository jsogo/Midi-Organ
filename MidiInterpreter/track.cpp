#include "track.h"
#include "timing.h"

#include <MidiFile.h>
#include <Options.h>
#include <vector>
#include <iostream>
#include <iomanip>
#include <sstream>

namespace midi {

	void Parser::readMidi(std::string& filename){
		MidiFile midifile;
		midifile.read(filename);

		std::cout << filename << std::endl;

		std::cout << "status: " << midifile.status() << std::endl;

		if(!midifile.status()){
			std::cerr << "Error reading MIDI file " << "one.mid" << std::endl;	
		}
		midifile.joinTracks();
		std::cout << "size: " << midifile[0].size() << std::endl;

		std::vector<processed_midi> alldata; 
		
		int track = 0;
		for(int event = 0; event < midifile[track].size(); event++){
			int command = 2;
			int note = 0;

			if(midifile[track][event].isNoteOn()){
				command = 1;
				note = (int)midifile[track][event][1];
			}
			else if(midifile[track][event].isNoteOff()){
				command = 0;
				note = (int)midifile[track][event][1];
			}
			
			if((command == 0 || command == 1) && 0 <= note){
				std::stringstream stream;
				stream << "0x" << std::hex << note;
				std::string hexnote(stream.str());
				std::cout << "command is " << command << " and note is " << hexnote << std::endl;

				if(stoll("0x32",0,16) > stoll(hexnote,0,16) || stoll("0x4A",0,16) < stoll(hexnote,0,16)){
					std::cout << "note " << hexnote << " is outside expected range" << std::endl;
				}
				else{
					std::cout << "note accepted" << std::endl;
					processed_midi event;
					//event.delta_t = 
					event.command[0] = command;
					event.command[1] = note;
				}
			}	
		}		
	}
}
