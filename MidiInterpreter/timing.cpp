#include "timing.h"
#include <thread>

namespace midi{

Timing::Timing(std::vector<Parser::processed_midi>& p_midis){
	int i = 0;
}

void Timing::playSong(std::vector<Parser::processed_midi>& p_midis){
	for(unsigned i = 0; i < p_midis.size(); ++i){
		//std::this_thread::sleep_for(p_midis[i].delta_t); //duration
		//gpio lib command p_midis[i].command[0] -- pin# p_midis[i].command[1] --high/low		
	}
}

}
