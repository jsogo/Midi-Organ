#include "timing.h"

#include <wiringPi.h>
#include <softPwm.h>
#include <thread>
#include <chrono>
#include <iostream>

namespace midi{


void Timing::playSong(std::unordered_map<double, std::vector< std::vector<int> >> gpio_data, std::vector<double> time){
	double prev_time = 0;
	for(unsigned i = 0; i < time.size(); ++i){
		std::this_thread::sleep_for(std::chrono::duration<double>(time[i]-prev_time));
		prev_time = time[i];
		for(unsigned event = 0; event < gpio_data.at(time[i]).size(); event++){
			int signal = gpio_data.at(time[i])[event][0];
	        	int note = gpio_data.at(time[i])[event][1];	
			std::cout << "time " << i << " signal " << signal << " note " << note << std::endl;
		}		
	}
}

}
