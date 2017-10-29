#include "track.h"
#include "timing.h"

#include <MidiFile.h>
#include <Options.h>
#include <unordered_map>
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
			std::cerr << "Error reading MIDI file " << filename << std::endl;	
		}
		midifile.joinTracks();
		midifile.doTimeAnalysis();
		std::cout << "size: " << midifile[0].size() << std::endl;

		int track = 0;
		std::unordered_map<double, std::vector< std::vector<int> >> gpio_data;
		double time_data [midifile[track].size()];
		
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
				double time = midifile.getTimeInSeconds(track,event);
				std::cout << "command is " << command << " and note is " << hexnote << " at " << time <<  std::endl;

				if(stoll("0x32",0,16) > stoll(hexnote,0,16) || stoll("0x4A",0,16) < stoll(hexnote,0,16)){
					std::cout << "note " << hexnote << " is outside expected range" << std::endl;
				}
				else{
					std::cout << "note accepted" << std::endl;	
					std::vector<int> event_data = {command, note};
					time_data[event] = time;
					std::cout << "time is " << time_data[event] << std::endl;
					
					//populate unordered_map
					if(gpio_data.find(time) == gpio_data.end()){
						std::vector< std::vector<int> > events = {event_data};
						gpio_data[time] = events;
					} else{
						gpio_data[time].push_back(event_data);
					}
				}
			}	
		}

		/*for(int i = 0; i < midifile[track].size(); i++){
			std::cout << "time is " << time_data[i] << std::endl;
		}*/

		/*for(int i = 0; i < midifile[track].size(); i++){
			std::cout << "time is " <<  time_data[i] << ' ';
			for(int j = 0; j < gpio_data[time_data[i]].size(); j++){
				for(int k = 0; k < 2; k++){
					std::cout << "...event: " << gpio_data[time_data[i]][j][k] << ' ';
				}
			}
			std::cout << std::endl;
		}*/		
	}
}
