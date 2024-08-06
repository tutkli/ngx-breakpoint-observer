import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideNgIconsConfig } from '@ng-icons/core';
import { HighlightJsModule } from 'ngx-highlight-js';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HighlightJsModule),
    provideNgIconsConfig({
      size: '1em',
    }),
  ],
};
