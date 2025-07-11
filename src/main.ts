import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { App } from './app/app';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import 'zone.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(ptBr);

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      })
    ),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatProgressBarModule),
    importProvidersFrom(MatCardModule),
    importProvidersFrom(MatIconModule),
    importProvidersFrom(MatProgressSpinnerModule),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
}).catch((err) => console.error(err));
