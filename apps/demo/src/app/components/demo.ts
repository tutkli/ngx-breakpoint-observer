import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  breakpointsTailwind,
  observeBreakpoints,
} from 'ngx-breakpoint-observer';
import { Breakpoint } from './breakpoint';

@Component({
  selector: 'demo-demo',
  standalone: true,
  imports: [Breakpoint, JsonPipe],
  template: `
    <h2>Demo</h2>
    <p>Resize your window to see breakpoints value changes.</p>

    <div
      class="relative m-0 mt-4 overflow-hidden rounded-lg border bg-gray-50 p-4 font-semibold">
      <div>Current breakpoints: {{ current() | json }}</div>
      <div>Active breakpoint: {{ active() }}</div>
      <demo-breakpoint name="xs" [value]="xs()" />
      <demo-breakpoint name="sm" [value]="sm()" />
      <demo-breakpoint name="md" [value]="md()" />
      <demo-breakpoint name="lg" [value]="lg()" />
      <demo-breakpoint name="xl" [value]="xl()" />
      <demo-breakpoint name="2xl" [value]="xxl()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo {
  breakpoints = observeBreakpoints(breakpointsTailwind);

  current = this.breakpoints.current();
  active = this.breakpoints.active();
  xs = this.breakpoints.smallerOrEqual('sm');
  sm = this.breakpoints.between('sm', 'md');
  md = this.breakpoints.between('md', 'lg');
  lg = this.breakpoints.between('lg', 'xl');
  xl = this.breakpoints.between('xl', '2xl');
  xxl = this.breakpoints.greaterOrEqual('2xl');
}
