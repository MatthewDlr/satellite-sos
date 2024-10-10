const int photocell1Pin = A0;
int photocell1Value = 0;
const int photocell2Pin = A1;
int photocell2Value = 0;
int lightOffset = 0;

const int tolerance = 25;
const float easingFactor = 0.5; 

const int motorPin = 9;
int motorAngle = 0;

int normalizeValue(int newValue, int previousValue) {
  if (abs(newValue - previousValue) <= tolerance) {
    return previousValue;
  }
  
  if (newValue < 0 + 100) {
    newValue = previousValue + (newValue - previousValue) * easingFactor;
  }
  
  else if (newValue > 1023 - 100) {
    newValue = previousValue + (newValue - previousValue) * easingFactor;
  }
  
  return newValue;
}

float positionToAngle(int position) {
  int angle = position * 0.7; // This value may need to be adjusted
  return max(-70, min(70, angle));
}

void moveMotor(int desiredAngle) {
  if (desiredAngle == motorAngle) {
    return;
  }
  
  // These values may need to be adjusted
  if (desiredAngle > motorAngle) {
    analogWrite(motorPin, 75);
    delay(10);
    analogWrite(motorPin, 0);
    motorAngle++;
  } else {
    analogWrite(motorPin, 110);
    delay(50);
    analogWrite(motorPin, 0);
    motorAngle = -70;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(photocell1Pin, INPUT);
  pinMode(photocell2Pin, INPUT);

  lightOffset = analogRead(photocell2Pin) - analogRead(photocell1Pin);
}

void loop() {
  photocell1Value = normalizeValue(analogRead(photocell1Pin), photocell1Value);
  photocell2Value = normalizeValue(analogRead(photocell2Pin), photocell2Value);

  const int lightPosition = photocell2Value - photocell1Value - lightOffset;
  const float lightPower = (photocell1Value + photocell2Value) / 2;
  const float lightAngle = positionToAngle(lightPosition);

  moveMotor(lightAngle); 
  Serial.println("signalPower:" + String(lightPower) + " satelliteAngle:" + String(lightAngle) + " motorAngle:" + String(motorAngle));
  delay(100);
}























