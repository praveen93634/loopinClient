import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
   const isLoggedIn = !!localStorage.getItem('token'); // or check with AuthService

    if (isLoggedIn) {
      return true; // allow access
    } else {
      router.navigate(['/login']); // redirect to login if not logged in
      return false;
    }
};
