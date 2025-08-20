import { LoginService } from '@/services/login-service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService=inject(LoginService);
  const rol=loginService.token()?.rol;
  if(rol==="administrador"){
    return true;
  }
  return false;
};
