import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from './code-block';

@Component({
  selector: 'demo-installation',
  imports: [CodeBlock],
  template: `
    <h2>Installation</h2>
    <demo-code-block code="npm i ngx-breakpoint-observer" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Installation {}
