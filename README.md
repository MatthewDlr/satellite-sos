# SatelliteSos

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
