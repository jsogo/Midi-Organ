#ifndef TIMER_H_
#define TIMER_H_

#include "track.h"

namespace midi{

class Timing{

	public:
	Timing(Parser::processed_midi p_midi[]);
	virtual ~Timing() = default;

};

}

#endif //TIMER_H_
