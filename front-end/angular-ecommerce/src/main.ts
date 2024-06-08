import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { provideAuth0 } from '@auth0/auth0-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAuth0({
//       domain: 'dev-eawonebv5dnnraat.us.auth0.com',
//       clientId: 'LZpBpacNI3TN0I7wtzxe5GOVO2QYwE2q',
//       authorizationParams: {
//         redirect_uri: window.location.origin,
//       },
//     }),
//   ],
// });
