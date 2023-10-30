import { Directive, HostBinding, Input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from './cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-gray-500',
  {
    variants: {
      variant: {
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        ghost: 'hover:gray-200 hover:text-gray-800',
      },
      size: {
        default: 'py-2 px-4',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
    },
  }
);
type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[demoButton]',
  standalone: true,
})
export class DemoButton {
  private _variant: ButtonVariants['variant'] = 'secondary';
  @Input()
  get variant(): ButtonVariants['variant'] {
    return this._variant;
  }

  set variant(value: ButtonVariants['variant']) {
    this._variant = value;
    this._class = this.generateClasses();
  }

  private _size: ButtonVariants['size'] = 'default';
  @Input()
  get size(): ButtonVariants['size'] {
    return this._size;
  }

  set size(value: ButtonVariants['size']) {
    this._size = value;
    this._class = this.generateClasses();
  }

  private _inputClass = '';
  @Input()
  set class(inputs: string) {
    this._inputClass = inputs;
    this._class = this.generateClasses();
  }

  @HostBinding('class')
  private _class = this.generateClasses();

  private generateClasses() {
    return cn(
      buttonVariants({ variant: this._variant, size: this._size }),
      this._inputClass
    );
  }
}
