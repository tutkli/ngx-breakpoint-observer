import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  breakpointsTailwind,
  observeBreakpoints,
} from 'ngx-breakpoint-observer';
import { JsonPipe } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { DemoSnipped } from './components/snipped';
import { simpleGithub } from '@ng-icons/simple-icons';
import { DemoHeader } from './components/header';
import { DemoBreakpoint } from './components/breakpoint';

@Component({
  standalone: true,
  imports: [JsonPipe, DemoSnipped, DemoHeader, DemoBreakpoint],
  selector: 'demo-root',
  viewProviders: [provideIcons({ simpleGithub })],
  template: `
    <div class="m-auto h-screen max-w-[1000px] overflow-auto p-4 sm:p-10">
      <main class="flex flex-col items-center justify-center gap-5">
        <demo-header />

        <div class="flex flex-col text-center font-medium">
          <p class="py-5">
            Resize your window to see breakpoints value changes.
          </p>

          <div>Current breakpoints: {{ current() | json }}</div>
          <div>Active breakpoint: {{ active() }}</div>
          <demo-breakpoint name="xs" [value]="xs()" />
          <demo-breakpoint name="sm" [value]="sm()" />
          <demo-breakpoint name="md" [value]="md()" />
          <demo-breakpoint name="lg" [value]="lg()" />
          <demo-breakpoint name="xl" [value]="xl()" />
          <demo-breakpoint name="2xl" [value]="xxl()" />
        </div>

        <demo-snipped class="w-full" />
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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
