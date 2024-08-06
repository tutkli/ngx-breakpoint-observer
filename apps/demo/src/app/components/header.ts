import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { DemoButton } from '../ui/button.directive';
import { DemoInstallButton } from './install-button';

@Component({
  selector: 'demo-header',
  standalone: true,
  imports: [DemoButton, DemoInstallButton, NgIcon],
  viewProviders: [provideIcons({ simpleGithub })],
  host: {
    class: 'flex w-full items-center justify-between gap-5',
  },
  template: `
    <a
      demoButton
      variant="ghost"
      href="https://github.com/tutkli/ngx-breakpoint-observer"
      target="_blank"
      rel="noopener">
      <ng-icon name="simpleGithub" size="2rem" />
      <span class="sr-only">Github</span>
    </a>

    <div>
      <demo-install-button />
    </div>
  `,
})
export class DemoHeader {}
