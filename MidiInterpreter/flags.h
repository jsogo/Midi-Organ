#ifndef FLAGS_H_
#define FLAGS_H_

#include <string>
#include <vector>

namespace midi{

class Flags{

	public:
	std::vector<int> readFlags(std::string flags);
};

}

#endif //FLAGS_H_
