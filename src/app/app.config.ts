import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

/**
 * Configures the application providers required for the Angular application.
 * Registers routing, HTTP communication, animations, and toast notifications.
 * @return {ApplicationConfig} Application configuration containing the required providers.
 */
export const appConfig: ApplicationConfig = {

  // Provides Angular routing using the application routes.

  providers: [provideRouter(routes),

  // Provides HttpClient for performing HTTP operations such as
  // GET, POST, PUT, PATCH, and DELETE requests.
  provideHttpClient(),

  // Use for adding the animation 
  provideAnimations(),

  // Displays toast notifications in the top-right corner.
  provideToastr({
    positionClass: 'toast-top-right',
    timeOut: 3000,
    progressBar: true,
    closeButton: true
  })]
};
