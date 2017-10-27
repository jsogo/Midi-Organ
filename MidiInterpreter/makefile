DEBUG    = -g
CXXFLAGS = -Wall $(DEBUG) -std=c++11
OBJS     = main.o gpwriter.o header.o iohandler.o timing.o track.o

midiorgan : $(OBJS)
		cc -o midiorgan $(OBJS)
main.o : main.cpp
gpwriter.o : gpwriter.cpp gpwriter.h
		cc -c gpwriter.cpp
header.o : header.cpp header.h
		cc -c header.cpp
iohandler.o : iohandler.cpp iohandler.h
		cc -c iohandler.cpp
timing.o : timing.cpp timing.h
		cc -c timing.cpp
track.o: track.cpp track.h
		cc -c track.cpp
clean :
	rm midiorgan main.o gpwriter.o header.o iohandler.o timing.o track.o
