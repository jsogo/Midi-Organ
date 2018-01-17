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
	wiringPiSetup();
	
	//initialize pins
	for(int i = 0; i < 17; ++i){
		pinMode(i, OUTPUT);
	}
	for(int i = 21; i < 29; ++i){
		pinMode(i, OUTPUT);
	}

	std::unordered_map<int, std::string> notesmap = {
			{50, "D3"}, {51, "Ds3"}, {52, "E3"}, {53, "F3"}, {54, "Fs3"}, {55, "G3"}, {56, "Gs3"},
			{57, "A4"}, {58, "As4"}, {59, "B4"}, {60, "C4"}, {61, "Cs4"}, {62, "D4"}, {63, "Ds4"},
			{64, "E4"}, {65, "F4"}, {66, "Fs4"}, {67, "G4"}, {68, "Gs4"}, {69, "A5"}, {70, "As5"},
			{71, "B5"}, {72, "C5"}, {73, "Cs5"}, {74, "D5"}
			};
	std::unordered_map<int, int> pinsmap = {
			{50, 0}, {51, 1}, {52, 2}, {53, 3}, {54, 4}, {55,5}, {56, 6}, {57, 7}, {58, 10}, {59, 9},
			{60, 8}, {61, 11}, {62, 12}, {63, 13}, {64, 14}, {65, 15}, {66, 16}, {67, 21}, {68, 22}, {69, 23},
			{70, 24}, {71, 25}, {72, 26}, {73, 27}, {74, 28}
			};
	
	for(unsigned i = 0; i < time.size(); ++i){
		std::this_thread::sleep_for(std::chrono::duration<double>(time[i]-prev_time));
		prev_time = time[i];
		for(unsigned event = 0; event < gpio_data.at(time[i]).size(); event++){
			int signal = gpio_data.at(time[i])[event][0];
	        	int note = gpio_data.at(time[i])[event][1];
			int pin = pinsmap.at(note);	
			std::cout << "time " << i << " signal " << signal << " note " << notesmap.at(note) << std::endl;

			if(signal == 1){
				digitalWrite(pin, HIGH);
			}
			else{
				digitalWrite(pin, LOW);
			}
		}		
	}

	for(int i = 0; i < 17; ++i){
		digitalWrite(i, LOW);
	}
	for(int i = 21; i < 29; ++i){
		digitalWrite(i, HIGH);
	}
}

}
