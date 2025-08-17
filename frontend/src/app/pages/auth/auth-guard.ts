import { LoginService } from '@/services/login-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService=inject(LoginService);
  const token = loginService.token();
  const ruta = inject(Router);
  if(!token){
    localStorage.clear();
    ruta.navigateByUrl("/auth/login");
    return false;
  }
  return true;
};
