import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from './code-block';

@Component({
  selector: 'demo-usage',
  standalone: true,
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

const breakpoints = observeBreakpoints(breakpointsTailwind);

const smAndLarger = breakpoints.greaterOrEqual('sm'); // sm and larger
const largerThanSm = breakpoints.greater('sm'); // only larger than sm
const lgAndSmaller = breakpoints.smallerOrEqual('lg'); // lg and smaller
const smallerThanLg = breakpoints.smaller('lg'); // only smaller than lg`;

  usage2 = `import { observeBreakpoints } from 'ngx-breakpoint-observer';

const breakpoints = observeBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
});

// Can be 'mobile' or 'tablet' or 'laptop' or 'desktop'
const activeBreakpoint = breakpoints.active();

// true or false
const laptop = breakpoints.between('laptop', 'desktop');`;
}
