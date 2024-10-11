# SatelliteSos

This is my attempt to reproduce Apple emergency SOS via satellite feature but better with a motor that actually moves the device toward the right direction. This is just a fun project from one of my classes and it is not meant to actually replace the real SOS feature in any way; I simply wanted to mimic the amazing UI that Apple's swift engineers have created.

The app is made with Angular and the motor is controlled by an Arduino.
See it live at: https://satellite.mdelarue.dev/

![CleanShot 2024-10-10 at 14 43 01](https://github.com/user-attachments/assets/5de91f54-883d-4832-8b76-ad9956754d8c)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Start by install dependencies with `npm install`.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Arduino
To fully work on your device, you need an Arduino connected to your computer in USB writing the necessary data to the serial port. The Arduino code is in the `arduino` folder. You can upload it to your Arduino using the Arduino IDE.

All you need to do is to print the following information in the serial port:
```
  Serial.println("signalPower:" + String(lightPower) + " satelliteAngle:" + String(lightAngle) + " motorAngle:" + String(motorAngle));
```

The app is made to display information for angles between -70 and 70 degrees for the satellite; otherwise, the satellite will be considered out of range and not shown on the screen.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
