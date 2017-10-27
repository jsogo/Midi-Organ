#include "iohandler.h"
#include <string>
#include <iostream>
#include <sstream>

namespace midi{

void IOHandler::start(){

	std::cout << "Please input your filepath:" << std::endl;
	std::string filename;
	std::string input;
	std::getline(std::cin, input);
	std::stringstream(input) >> filename;
	std::cout << "thanks" << std::endl;

}

}
