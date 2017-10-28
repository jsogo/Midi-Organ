#ifndef TIMER_H_
#define TIMER_H_

#include "track.h"
#include <vector>

namespace midi{

class Timing{

	public:
	Timing(std::vector<Parser::processed_midi>& p_midis);
	virtual ~Timing() = default;

	void playSong(std::vector<Parser::processed_midi>& p_midis);
};

}

#endif //TIMER_H_
