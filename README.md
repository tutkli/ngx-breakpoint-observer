# ngx-breakpoint-observer

This library adds reactive breakpoint and media query methods based on Signals.

The code is directly inspired by [VueUse](https://vueuse.org/).

## Installation

```shell
npm install ngx-breakpoint-observer
```

## Usage

```ts
import {
  breakpointsTailwind,
  observeBreakpoints,
} from 'ngx-breakpoint-observer';

@Component({})
export class AppComponent {
  breakpoints = observeBreakpoints(breakpointsTailwind);

  reactiveStuff = signal<keyof typeof breakpointsTailwind>('sm');
  isGreaterThanSignal = this.breakpoints.greaterOrEqual(this.reactiveStuff); // use signal without calling it!

  smAndLarger = this.breakpoints.greaterOrEqual('sm'); // sm and larger
  largerThanSm = this.breakpoints.greater('sm'); // only larger than sm
  lgAndSmaller = this.breakpoints.smallerOrEqual('lg'); // lg and smaller
  smallerThanLg = this.breakpoints.smaller('lg'); // only smaller than lg
}
```

```ts
import { observeBreakpoints } from 'ngx-breakpoint-observer';

@Component({})
export class AppComponent {
  breakpoints = observeBreakpoints({
    mobile: 0, // optional
    tablet: 640,
    laptop: 1024,
    desktop: 1280,
  });

  // Can be 'mobile' or 'tablet' or 'laptop' or 'desktop'
  activeBreakpoint = this.breakpoints.active();

  // true or false
  laptop = this.breakpoints.between('laptop', 'desktop');
}
```

## License

[MIT License](https://github.com/tutkli/ngx-breakpoint-observer/blob/master/LICENSE)
