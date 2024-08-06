import { computed, Directive, input } from '@angular/core';
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
  host: {
    '[class]': 'hostClass()',
  },
})
export class DemoButton {
  variant = input<ButtonVariants['variant']>('secondary');
  size = input<ButtonVariants['size']>('default');
  _class = input<string>('', { alias: 'class' });

  hostClass = computed(() =>
    cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
        className: this._class(),
      })
    )
  );
}
