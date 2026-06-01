import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: false })
export class RevealDirective implements OnInit {
  @Input('appReveal') delay = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const native = this.el.nativeElement as HTMLElement;
    native.setAttribute('data-reveal', this.delay ?? '');

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(native);
  }
}
