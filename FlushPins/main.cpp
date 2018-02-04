#include <wiringPi.h>
#include <softPwm.h>

int main(){

	wiringPiSetup();
	for(int i = 0; i < 17; i++){
		pinMode(i, OUTPUT);
	}
	for(int i = 21; i <= 29; i++){
		pinMode(i, OUTPUT);
	}

	for(int i = 0; i < 17; ++i){
		digitalWrite(i, LOW);
	}
	for(int i = 21; i <=29; i++){
		digitalWrite(i, LOW);
	}
}
