#ifndef PARSER_H_
#define PARSER_H_

#include <chrono>
#include <vector>
#include <string>
#include <unordered_map>

namespace midi{

class Parser{
	public:
	
	void readMidi(std::string& filename); 
};

}

#endif //PARSER_H_
