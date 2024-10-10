import { Component, effect, input } from "@angular/core";
import { Data } from "../data.type";

@Component({
  selector: "app-sos-view",
  standalone: true,
  imports: [],
  templateUrl: "./sos-view.component.html",
  styleUrl: "./sos-view.component.scss",
})
export class SosViewComponent {
  data = input<Data>();

  constructor() {
    effect(() => {
      console.log(this.data());
    });
  }
}
