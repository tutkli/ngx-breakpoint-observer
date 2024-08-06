import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightJsDirective } from 'ngx-highlight-js';

@Component({
  selector: 'demo-snipped',
  standalone: true,
  imports: [HighlightJsDirective],
  template: `
    <textarea highlight-js [lang]="'typescript'">
    import {
  breakpointsTailwind,
  observeBreakpoints
} from 'ngx-breakpoint-observer';

breakpoints = observeBreakpoints(breakpointsTailwind);

current = this.breakpoints.current();
active = this.breakpoints.active();
xs = this.breakpoints.smallerOrEqual('sm');
sm = this.breakpoints.between('sm', 'md');
md = this.breakpoints.between('md', 'lg');
lg = this.breakpoints.between('lg', 'xl');
xl = this.breakpoints.between('xl', '2xl');
xxl = this.breakpoints.greaterOrEqual('2xl');
      </textarea
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSnipped {}
