import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HighlightJsModule } from 'ngx-highlight-js';
import { provideNgIconsConfig } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HighlightJsModule),
    provideNgIconsConfig({
      size: '1em',
    }),
  ],
};
