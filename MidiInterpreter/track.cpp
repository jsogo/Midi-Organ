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

		std::cout << "trying to do the thing" << std::endl;
		if(!midifile.status()){
			std::cerr << "Error reading MIDI file " << filename << std::endl;	
		}
		midifile.joinTracks();
		int track = 0;
		for(int i = 0; i < midifile[track].size(); i++){
			int command;
			if(midifile[track][i].isNoteOn()){
				command = 1;
			}
			else if(midifile[track][i].isNoteOff()){
				command = 0;
			}
			else{break;}

			std::cout << "note status: " << command << std::endl;
		}		
	}
}
