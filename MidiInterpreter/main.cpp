#include "track.h"
#include "timing.h"

#include <string>
#include <iostream>

int main(int argc, char* argv[]){
	//midi::IOHandler iohandler;
	//iohandler.start();
	
	if(argc < 2){
		std::cerr << "Usage: " << argv[0] << " FILENAME" << std::endl;
		return 1;
	}
	std::string filename(argv[1]);
	midi::Parser parser;
	parser.readMidi(filename);
}
