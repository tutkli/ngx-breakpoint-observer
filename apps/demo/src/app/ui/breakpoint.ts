import { Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'demo-breakpoint',
  standalone: true,
  template: ` <div>
    {{ name }}:
    <span [class]="value() ? 'text-green-500' : 'text-red-500'">
      {{ value() }}
    </span>
  </div>`,
})
export class DemoBreakpoint {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) value!: Signal<boolean>;
}
