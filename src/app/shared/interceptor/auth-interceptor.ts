import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const token = localStorage.getItem('token');
 if (token) {
   const clonereq=req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
  });
  return next(clonereq);
 }
  return next(req);
};
