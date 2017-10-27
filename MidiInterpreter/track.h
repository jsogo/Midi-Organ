#ifndef PARSER_H_
#define PARSER_H_

#include <chrono>
#include <vector>

namespace midi{

class Parser{
	public:
	struct processed_midi {
		std::chrono::nanoseconds delta_t;
		int command [2];				
	} ;
	
	std::vector<processed_midi> readMidi(); 
	void startTiming();	
};

}

#endif //PARSER_H_
