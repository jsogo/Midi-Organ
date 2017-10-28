#include "track.h"
#include "timing.h"

#include <MidiFile.h>
#include <Options.h>
#include <vector>
#include <iostream>

namespace midi {

	void Parser::readMidi(std::string& filename){
		MidiFile midifile;
		midifile.read(filename);

		std::cout << filename << std::endl;

		std::cout << "status: " << midifile.status() << std::endl;

		if(!midifile.status()){
			std::cout << "its not working" << std::endl;
			std::cerr << "Error reading MIDI file " << "one.mid" << std::endl;	
		}
		midifile.joinTracks();
		std::cout << "size: " << midifile[0].size() << std::endl;
		
		int track = 0;
		for(int event = 0; event < midifile[track].size(); event++){
			int command;
			if(midifile[track][event].isNoteOn()){
				command = 1;
				for(int i = 0; i < midifile[track][event].size(); i++){
					std::cout << std::hex << (int)midifile[track][event][i] << ' ';
				}
				std::cout << std::endl;
			}
			else if(midifile[track][event].isNoteOff()){
				command = 0;
				for(int i = 0; i < midifile[track][event].size(); i++){
					std::cout << std::hex << (int)midifile[track][event][i] << ' ';
				}
				std::cout << std::endl;
			}
			else{command = 2;}

			std::cout << "note status: " << command << std::endl;
		}		
	}
}
