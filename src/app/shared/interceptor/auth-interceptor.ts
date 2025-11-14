import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../auth/service/auth';
import { SecureStorageService } from '../service/secure-storage-service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router)
  const stogrageservice = inject(SecureStorageService)
  if (token) {
    const clonereq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });


    return next(clonereq)
    .pipe(catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        stogrageservice.clear();
        router.navigate(['/login'])
      }
      return throwError(() => error);
    }));
  }
  return next(req);
};
