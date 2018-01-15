#include "flags.h"

#include <iostream>
#include <vector>

namespace midi{

	std::vector<int> Flags::readFlags(std::string flags){
		std::vector<int> flag_output;
		for(int i = 1; i < flags.length(); i++){
			std::cout << "entered for loop" << std::endl;
			char c[2];
			strcpy(c, flags[0].c_str());
			switch(c){
				std::cout << "switchy" << std::endl;
				case 't' :
				       	flag_output[0] = 1; // transpose
					break;
				case 'n' : 
					flag_output[1] = 1; // note
					break;
				case 'l' : 
					flag_output[2] = 1; // length
					break;
				
				default: std::cerr << "undefined flag";
			}
		}
		return flag_output;
	}

}
