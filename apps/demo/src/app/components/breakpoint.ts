import { Component, Input, Signal } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'demo-breakpoint',
  standalone: true,
  template: ` <p>
    {{ name() }}:
    <span [class]="value() ? 'text-green-500' : 'text-red-500'">
      {{ value() }}
    </span>
  </p>`,
})
export class DemoBreakpoint {
  name = input.required<string>();
  value = input.required<boolean>();
}
