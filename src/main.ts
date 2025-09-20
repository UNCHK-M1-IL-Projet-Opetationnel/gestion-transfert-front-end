import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { createIcons, icons } from 'lucide';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // <- nécessaire pour HttpClient
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule) // <- ajoute HttpClientModule
  ]
})
.catch((err) => console.error(err));

document.addEventListener('DOMContentLoaded', () => {
  createIcons({ icons });
});
