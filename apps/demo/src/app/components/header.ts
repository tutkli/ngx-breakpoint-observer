import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GitHubIcon } from './github-icon';

@Component({
  selector: 'demo-header',
  imports: [GitHubIcon],
  host: {
    class: 'flex flex-col w-full justify-center gap-5',
  },
  template: `
    <a
      class="w-fit"
      href="https://github.com/tutkli/ngx-breakpoint-observer"
      target="_blank"
      rel="noopener">
      <demo-github-icon />
      <span class="sr-only">Github</span>
    </a>

    <h1>ngx-breakpoint-observer</h1>
    <p>Angular reactive breakpoint observer based on Signals.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
