#include "track.h"
#include "timing.h"

namespace midi {
	processed_midi p_midi [midi_length];
	for(int i = 0; i < midi_length; ++i){
		p_midi[i].delta_t = std::chrono::nanoseconds(10000);
		p_midi[i].command = [1,1];
	}
	
	Timing timing(p_midi);
}
