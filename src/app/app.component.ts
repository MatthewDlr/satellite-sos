import { CommonModule } from "@angular/common";
import { Component, isDevMode } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NgxSerial } from "ngx-serial";
import { Data } from "./data.type";
import { SosViewComponent } from "./sos-view/sos-view.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SosViewComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "satellite-sos";
  serial: NgxSerial;
  data: Data = {
    satelliteAngle: 0,
    isSatelliteConnected: false,
    strength: 0,
    motorAngle: 0,
  };
  isArduinoConnected = false;
  minLight: number | undefined;

  constructor() {
    this.serial = new NgxSerial(this.dataHandler.bind(this));
  }

  public async connect() {
    try {
      await this.serial.connect(this.dataHandler.bind(this));
      this.isArduinoConnected = true;
    } catch (error) {
      isDevMode() && console.error(error);
      this.isArduinoConnected = false;
    }
  }

  private dataHandler(data: string) {
    if (data === undefined || typeof data !== "string") return;

    const newData = this.parseData(data);
    if (newData != this.data) this.data = newData;
  }

  private parseData(data: string): Data {
    console.log(data);
    const regex = /signalPower:(\d+(\.\d+)?)\s+satelliteAngle:(\d+(\.\d+)?)\s+strength:(\d+)\s+motorAngle:(\d+(\.\d+)?)/;
    const match = data.match(regex);
    if (match) {
      if (this.minLight === undefined) this.minLight = parseFloat(match[1]) * 1.05;
      console.log(this.minLight);
      return {
        isSatelliteConnected: parseFloat(match[1]) > this.minLight,
        satelliteAngle: parseFloat(match[3]),
        strength: parseFloat(match[5]),
        motorAngle: parseFloat(match[6]),
      };
    } else {
      throw new Error("Invalid data format");
    }
  }
}
