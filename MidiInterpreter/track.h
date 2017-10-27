#ifndef PARSER_H_
#define PARSER_H_

#include <chrono>

namespace midi{

class Parser{
	public:
	struct processed_midi {
		std::chrono::nanoseconds delta_t;
		int command [2];				
	} ;

	int midi_length;

	void startTiming();	
};

}

#endif //PARSER_H_
