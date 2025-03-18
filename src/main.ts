import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

const firebaseApp = initializeApp(environment.firebase);
const auth = getAuth(firebaseApp);

// Create a promise that resolves once Firebase has determined the auth state
const authStatePromise = new Promise<void>((resolve, reject) => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      unsubscribe();
      resolve();
    },
    (error) => reject(error)
  );
});

// Only bootstrap Angular after the auth state is resolved
authStatePromise
  .then(() => {
    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
  })
  .catch((err) => console.error('Error checking auth state:', err));


