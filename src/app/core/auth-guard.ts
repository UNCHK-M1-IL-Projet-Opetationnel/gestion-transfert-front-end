import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); 

  if (token) {
    // utilisateur authentifié
    return true;
  } else {
    // pas authentifié → redirection vers login
    return router.createUrlTree(['/login']);
  }
};
