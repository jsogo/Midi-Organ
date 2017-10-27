#include "track.h"
#include "timing.h"
#include <vector>

namespace midi {

	void Parser::startTiming(){
		std::vector<processed_midi> p_midis;
		for(int i = 0; i < p_midis.size(); ++i){
			p_midis[i].delta_t = std::chrono::nanoseconds(10000);
			p_midis[i].command[0] = 1;
			p_midis[i].command[0] = 1;
		}
	
		Timing timing(p_midis);
	}
}
