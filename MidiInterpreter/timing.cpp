#include "timing.h"
#include <thread>

namespace midi{


void Timing::playSong(std::unordered_map<double, std::vector< std::vector<int> >> gpio_data, std::vector<double> time){
	for(unsigned i = 0; i < time.size(); ++i){
		//std::this_thread::sleep_for(p_midis[i].delta_t); //duration
		//gpio lib command p_midis[i].command[0] -- pin# p_midis[i].command[1] --high/low		
	}
}

}
