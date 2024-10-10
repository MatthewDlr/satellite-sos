import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { NgxSerial } from "ngx-serial";
import { SosViewComponent } from "./sos-view/sos-view.component";
import { Data } from "./data.type";

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
    humanViewAngle: 0
  };
  isArduinoConnected = false;

  constructor() {
    this.serial = new NgxSerial(this.dataHandler.bind(this));
  }

  public connect() {
    this.serial.connect(this.dataHandler.bind(this));
  }

  private parseData(data: string): Data {
    const regex = /signalPower:\s*(-?\d+(\.\d+)?)\s+satelliteAngle:\s*(-?\d+(\.\d+)?)\s+strength:\s*(\d+)\s+?humanViewAngle:\s*(-?\d+(\.\d+)?)/;
    const match = data.match(regex);
    if (match) {
      return {
        isSatelliteConnected: parseFloat(match[1]) > 875,
        satelliteAngle: parseFloat(match[3]),
        strength: parseInt(match[5]),
        humanViewAngle : parseFloat(match[7])
      };
    } else {
      throw new Error("Invalid data format");
    }
  }

  private dataHandler(data: string) {
    if (data === undefined || typeof data !== "string") {
      this.isArduinoConnected = false;
      return;
    };

    this.isArduinoConnected = true;
    const newData = this.parseData(data);
    if (newData != this.data) this.data = newData;
  }
}
