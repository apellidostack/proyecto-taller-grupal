import { Sesion } from '@/models/sesion';
import { LoginService } from '@/services/login-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService=inject(LoginService);
  //const token = sessionStorage.getItem('token');
  let sesion:Sesion|undefined = loginService.token();
  console.log(sesion?.token);
  
  
    if (sesion) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${sesion?.token}`)
      });

      return next(cloned);
    } else {
      return next(req);
    }
};
