import { afterNextRender, AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: false
})
export class HeroComponent {
  private static readonly PROJECTS_COUNT = 16;
  private static readonly CLIENTS_COUNT = 8;
  private static readonly YEARS_COUNT = 10;

  readonly animationDuration = 3000;

  projects = 0;
  clients = 0;
  years = 0;

  constructor() {
    afterNextRender(() => {
      this.animateValue(HeroComponent.PROJECTS_COUNT, v => this.projects = v);
      this.animateValue(HeroComponent.CLIENTS_COUNT, v => this.clients = v);
      this.animateValue(HeroComponent.YEARS_COUNT, v => this.years = v);
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private animateValue(
    end: number,
    setter: (value: number) => void,
    duration = this.animationDuration
  ) {
    const start = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setter(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}
