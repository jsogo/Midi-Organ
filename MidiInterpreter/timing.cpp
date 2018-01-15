#include "timing.h"

#include <wiringPi.h>
#include <softPwm.h>
#include <thread>
#include <chrono>
#include <iostream>
#include <unordered_map>
#include <string>

namespace midi{


void Timing::playSong(std::unordered_map<double, std::vector< std::vector<int> >> gpio_data, std::vector<double> time){
	double prev_time = 0;
	std::unordered_map<int, std::string> notesmap = {
			{50, "D3"}, {51, "Ds3"}, {52, "E3"}, {53, "F3"}, {54, "Fs3"}, {55, "G3"}, {56, "Gs3"},
			{57, "A4"}, {58, "As4"}, {59, "B4"}, {60, "C4"}, {61, "Cs4"}, {62, "D4"}, {63, "Ds4"},
			{64, "E4"}, {65, "F4"}, {66, "Fs4"}, {67, "G4"}, {68, "Gs4"}, {69, "A5"}, {70, "As5"},
			{71, "B5"}, {72, "C5"}, {73, "Cs5"}, {74, "D5"}
			};
	std::unordered_map<std::string, int> pinsmap = {
			{"D3", 1}, {"Ds3", 2}, {"E3", 3}, {"F3", 4}, {"Fs3", 5}, {"G3", 6}, {"Gs3", 7},
			{"A4", 8}, {"As4", 9}, {"B4", 10}
			};
	for(unsigned i = 0; i < time.size(); ++i){
		std::this_thread::sleep_for(std::chrono::duration<double>(time[i]-prev_time));
		prev_time = time[i];
		for(unsigned event = 0; event < gpio_data.at(time[i]).size(); event++){
			int signal = gpio_data.at(time[i])[event][0];
	        	int note = gpio_data.at(time[i])[event][1];	
			std::cout << "time " << i << " signal " << signal << " note " << notesmap.at(note) << std::endl;
		}		
	}
	std::cout << "finished" << std::endl;
}

}
