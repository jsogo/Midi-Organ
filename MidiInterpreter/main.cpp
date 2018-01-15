#include "track.h"
#include "timing.h"
#include "flags.h"

#include <string>
#include <iostream>

int main(int argc, char* argv[]){
	std::string filename;
	std::vector<int> flags;
	if(argc == 2){
		filename = std::string(argv[1]);
		if(filename[0] == '-'){
			std::cerr << "Usage: " << argv[0] << " -FLAGS FILENAME" << std::endl;
			return 1;
		}
	}
	else if(argc == 3){
		std::cout << "valid number args" << std::endl;

		std::string arg1(argv[1]);
		std::string arg2(argv[2]);
		bool flag1 = false;
		bool flag2 = false;
		midi::Flags flagReader;

		if(arg1[0] == '-'){
			std::cout << "arg1 is -" << std::endl;
			flag1 = true;
			flags = flagReader.readFlags(arg1);
		}else{filename = arg1;}
		if(arg2[0] == '-'){
			std::cout << "arg2 is -" << std::endl;
			flag2 = true;
			flags = flagReader.readFlags(arg2);
		}else{filename = arg2;}

		if(flag1 && flag2){
			std::cerr << "Usage: " << argv[0] << " -FLAGS FILENAME" << std::endl;
			return 1;
		}
		if(!(flag1 || flag2)){
			std::cerr << "Usage: " << argv[0] << " -FLAGS FILENAME" << std::endl;
			return 1;
		}
		std::cout << "did a thing" << std::endl;
	}else{
		std::cerr << "Usage: " << argv[0] << " -FLAGS FILENAME" << std::endl;
		return 1;
	}

	std::cout << filename << std::endl;
	for(int i = 0; i < 3; i++){
		std::cout << flags[i] << std::endl;
	}
	//midi::Parser parser;
	//parser.readMidi(filename);
}
