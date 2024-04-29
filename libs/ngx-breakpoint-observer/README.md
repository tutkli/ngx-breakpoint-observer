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

const breakpoints = observeBreakpoints(breakpointsTailwind);

const smAndLarger = breakpoints.greaterOrEqual('sm'); // sm and larger
const largerThanSm = breakpoints.greater('sm'); // only larger than sm
const lgAndSmaller = breakpoints.smallerOrEqual('lg'); // lg and smaller
const smallerThanLg = breakpoints.smaller('lg'); // only smaller than lg
```

```ts
import { observeBreakpoints } from 'ngx-breakpoint-observer';

const breakpoints = observeBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
});

const laptop = breakpoints.between('laptop', 'desktop');
```

## License

[MIT License](https://github.com/tutkli/ngx-breakpoint-observer/blob/master/LICENSE)
