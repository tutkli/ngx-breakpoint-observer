import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Demo } from './components/demo';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Installation } from './components/installation';
import { Usage } from './components/usage';

@Component({
  standalone: true,
  imports: [Header, Installation, Demo, Usage, Footer],
  selector: 'demo-root',
  template: `
    <main
      class="container m-auto flex flex-col gap-10 px-4 pb-4 pt-16 sm:px-10 sm:pb-10 sm:pt-24">
      <demo-header />

      <demo-installation />
      <demo-demo />
      <demo-usage />
      <demo-footer />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
