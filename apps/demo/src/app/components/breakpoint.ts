import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'demo-breakpoint',
  template: `
    <p>
      {{ name() }}:
      <span [class]="value() ? 'text-green-500' : 'text-red-500'">
        {{ value() }}
      </span>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breakpoint {
  name = input.required<string>();
  value = input.required<boolean>();
}
