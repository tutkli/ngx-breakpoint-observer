import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from './code-block';

@Component({
  selector: 'demo-usage',
  imports: [CodeBlock],
  template: `
    <h2>Usage</h2>
    <demo-code-block [code]="usage1" />
    <demo-code-block [code]="usage2" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Usage {
  usage1 = `import {
  breakpointsTailwind,
  observeBreakpoints,
} from 'ngx-breakpoint-observer';

@Component({})
export class AppComponent {
  breakpoints = observeBreakpoints(breakpointsTailwind);

  reactiveStuff = signal<keyof typeof breakpointsTailwind>('sm');
  isGreaterThanSignal = this.breakpoints.greaterOrEqual(this.reactiveStuff); // use signal without calling it!

  smAndLarger = this.breakpoints.greaterOrEqual('sm'); // sm and larger
  largerThanSm = this.breakpoints.greater('sm'); // only larger than sm
  lgAndSmaller = this.breakpoints.smallerOrEqual('lg'); // lg and smaller
  smallerThanLg = this.breakpoints.smaller('lg'); // only smaller than lg
}`;

  usage2 = `import { observeBreakpoints } from 'ngx-breakpoint-observer';

@Component({})
export class AppComponent {
  breakpoints = observeBreakpoints({
    mobile: 0, // optional
    tablet: 640,
    laptop: 1024,
    desktop: 1280,
  });

  // Can be 'mobile' or 'tablet' or 'laptop' or 'desktop'
  activeBreakpoint = this.breakpoints.active();

  // true or false
  laptop = this.breakpoints.between('laptop', 'desktop');
}`;
}
