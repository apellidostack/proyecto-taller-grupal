import { Sesion } from '@/models/sesion';
import { LoginService } from '@/services/login-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService=inject(LoginService);
  //const token = sessionStorage.getItem('token');
  let sesion:Sesion|undefined = loginService.token();
  console.log(sesion?.token);
  
  
    // Si el token existe, clonamos la solicitud y le añadimos la cabecera de autorización
    if (sesion) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${sesion?.token}`)
      });

      // Enviar la solicitud clonada con el token
      return next(cloned);
    } else {
      // Enviar la solicitud original si no hay token
      return next(req);
    }
};
