import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { DemoButton } from '../ui/button.directive';

@Component({
  selector: 'demo-install-button',
  standalone: true,
  imports: [NgIcon, DemoButton],
  viewProviders: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <button type="button" demoButton (click)="copyToClipboard()">
      {{ cmd }}
      <ng-icon [name]="copied() ? 'lucideCheck' : 'lucideCopy'" class="ml-2" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoInstallButton {
  cmd = 'npm i npx-breakpoint-observer';
  copied = signal<boolean>(false);
  copyTimeout: ReturnType<typeof setTimeout> | undefined;

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.cmd);
    this.copied.set(true);
    clearTimeout(this.copyTimeout);
    this.copyTimeout = setTimeout(() => this.copied.set(false), 2500);
  }
}
