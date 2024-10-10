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
    signalPower: 0,
  };

  constructor() {
    this.serial = new NgxSerial(this.dataHandler.bind(this));
  }

  public connect() {
    this.serial.connect(this.dataHandler.bind(this));
  }

  private parseData(data: string): Data {
    const regex = /signalPower:\s*(-?\d+(\.\d+)?)\s+satelliteAngle:\s*(-?\d+(\.\d+)?)/;
    const match = data.match(regex);
    if (match) {
      return {
        signalPower: parseFloat(match[1]),
        satelliteAngle: parseFloat(match[3]),
      };
    } else {
      throw new Error("Invalid data format");
    }
  }

  private dataHandler(data: string) {
    if (data === undefined || typeof data !== "string") return;

    const newData = this.parseData(data);
    if (newData !== this.data) this.data = newData;
  }
}
