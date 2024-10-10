import { Component, effect, ElementRef, input, ViewChild } from "@angular/core";
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
  previousData: Data = { satelliteAngle: 0, signalPower: 0 };
  @ViewChild("satellite") satellite!: ElementRef;
  @ViewChild("orbit") orbit!: ElementRef;

  constructor() {
    effect(() => {
      console.log(this.data());
      this.animateOrbitTransition(this.previousData.satelliteAngle, this.data()!.satelliteAngle, 1000);
      this.previousData = this.data()!;
    });

    // setTimeout(() => {
    //   this.animateOrbitTransition(0, 50, 1000);
    // }, 1000);
  }

  private moveAroundOrbit(angle: number) {
    const radius = this.orbit.nativeElement.offsetWidth / 2;
    const adjustedAngle = angle - 90;
    const angleInRadians = adjustedAngle * (Math.PI / 180);

    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians) + radius;

    this.satellite.nativeElement.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  }

  private animateOrbitTransition(startAngle: number, endAngle: number, duration: number) {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = this.easeInOut(progress);

      const currentAngle = startAngle + (endAngle - startAngle) * easedProgress;
      this.moveAroundOrbit(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}
