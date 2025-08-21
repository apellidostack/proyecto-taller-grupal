import { LoginService } from '@/services/login-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const pacienteGuard: CanActivateFn = (route, state) => {
  const loginService=inject(LoginService);
  const router=inject(Router);
  const rol=loginService.token()?.rol;
  if(rol==="paciente"){
    return true;
  }
  router.navigateByUrl("/ad");
  return false;
};
