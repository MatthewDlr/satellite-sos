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
    motorAngle: 0,
  };
  isDemoMode = false;
  minLight: number | undefined;
  port: any = undefined;

  constructor() {
    this.serial = new NgxSerial(this.dataHandler.bind(this));
  }

  toggleDemoMode() {
    this.isDemoMode = !this.isDemoMode;

    let interval: any | undefined;
    if (this.isDemoMode) {
      interval = setInterval(() => {
        this.generateActivity();
      }, 500);
    } else {
      if (interval) clearInterval(interval);
      this.data = {
        satelliteAngle: 0,
        isSatelliteConnected: false,
        motorAngle: 0,
      };
    }
  }

  private dataHandler(data: string) {
    if (data === undefined || typeof data !== "string") return;

    const newData = this.parseData(data);
    if (newData != this.data) this.data = newData;
  }

  public connect() {
    if (!this.port) {
      this.serial.connect((port: any) => {
        this.port = port;
      });
    }
  }

  public close() {
    if (this.port)
      this.serial.close((port: any) => {
        this.port = port;
      });
  }

  private parseData(data: string): Data {
    console.log(data);
    const regex = /signalPower:(-?\d+(\.\d+)?)\s+satelliteAngle:(-?\d+(\.\d+)?)\s+motorAngle:(-?\d+(\.\d+)?)/;
    const match = data.match(regex);
    if (match) {
      if (this.minLight === undefined) this.minLight = parseFloat(match[1]) * 1.05;
      console.log(this.minLight);
      return {
        isSatelliteConnected: parseFloat(match[1]) > this.minLight,
        satelliteAngle: parseFloat(match[3]),
        motorAngle: parseFloat(match[5]),
      };
    } else {
      throw new Error("Invalid data format");
    }
  }

  private generateActivity() {
    if (!this.isDemoMode) return;

    let satelliteAngle = this.data.satelliteAngle;
    let motorAngle = this.data.motorAngle;

    const delta = satelliteAngle - motorAngle;
    motorAngle += delta / (Math.random() * 10 + 5);

    if (Math.abs(delta) < 10) {
      const stayInPlaceProbability = Math.random();

      if (!(stayInPlaceProbability < 0.6)) {
        const angleAdjustment = Math.random() * 40 - 20;
        satelliteAngle += angleAdjustment;

        if (satelliteAngle < -50) {
          satelliteAngle = -40;
        } else if (satelliteAngle >= 50) {
          satelliteAngle = 40;
        }
      }
    }

    this.data = {
      isSatelliteConnected: true,
      satelliteAngle: satelliteAngle,
      motorAngle: motorAngle,
    };
  }
}
