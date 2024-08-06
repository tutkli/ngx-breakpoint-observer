import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

@Component({
  selector: 'demo-code-block',
  standalone: true,
  template: `
    <div class="group relative">
      <button
        (click)="onCopy()"
        class="absolute right-3 top-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-lg border bg-white opacity-0 transition-all hover:bg-gray-100 group-hover:opacity-100">
        @if (copying()) {
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          shape-rendering="geometricPrecision">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        } @else {
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          shape-rendering="geometricPrecision">
          <path
            d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" />
        </svg>
        }
      </button>

      <div class="relative m-0 mt-4 overflow-hidden rounded-lg border">
        <div [class]="className() + ' !bg-gray-50'">
          <pre #codeElement></pre>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
  code = input.required<string>();
  language = input<string>('javascript');

  codeElement = viewChild.required<ElementRef<HTMLElement>>('codeElement');

  copying = signal(false);
  className = computed(() => `hljs ${this.language()}`);

  highlightedCode = computed(() => {
    const result = hljs.highlight(this.code(), {
      language: this.language(),
      ignoreIllegals: true,
    });
    return result.value;
  });

  constructor() {
    effect(() => {
      this.codeElement().nativeElement.innerHTML = this.highlightedCode();
    });
  }

  onCopy() {
    navigator.clipboard.writeText(this.code());
    this.copying.set(true);
    setTimeout(() => {
      this.copying.set(false);
    }, 2000);
  }
}
