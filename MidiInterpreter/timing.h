#ifndef TIMER_H_
#define TIMER_H_

#include "track.h"
#include <vector>
#include <unordered_map>

namespace midi{

class Timing{

	public:

	void playSong(std::unordered_map<double, std::vector< std::vector<int> >> gpio_data, std::vector<double> time_data);
};

}

#endif //TIMER_H_
