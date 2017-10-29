#ifndef PARSER_H_
#define PARSER_H_

#include <chrono>
#include <vector>
#include <string>

namespace midi{

class Parser{
	public:
	struct processed_midi {
		double delta_t;
		int command [2];				
	} ;
	
	void readMidi(std::string& filename); 
};

}

#endif //PARSER_H_
