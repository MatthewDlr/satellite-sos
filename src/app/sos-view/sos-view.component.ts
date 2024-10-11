import { AfterViewInit, Component, effect, ElementRef, input, isDevMode, ViewChild } from "@angular/core";
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
  previousAngle: number = 0;
  transitionDuration: number = 500;

  @ViewChild("satellite") satellite!: ElementRef;
  @ViewChild("orbit") orbit!: ElementRef;
  @ViewChild("sight") sight!: ElementRef;
  @ViewChild("globe") globe!: ElementRef;

  constructor() {
    effect(() => {
      if (!this.data()) return;
      if (!this.data()!.isSatelliteConnected) {
        this.previousAngle = 0;
      }
      this.rotateMotor(this.data()!.motorAngle);
    });

    setInterval(() => {
      if (!this.data() || !this.data()?.isSatelliteConnected || this.data()?.satelliteAngle === 0) return;

      this.animateOrbitTransition(this.previousAngle, this.data()!.satelliteAngle, this.transitionDuration);
      this.previousAngle = this.data()!.satelliteAngle;
    }, this.transitionDuration);
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

  private rotateMotor(angle: number) {
    this.sight.nativeElement.style.transform = `rotate(${angle}deg)`;
  }
}
