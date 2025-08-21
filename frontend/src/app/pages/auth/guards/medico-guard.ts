import { LoginService } from '@/services/login-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const medicoGuard: CanActivateFn = (route, state) => {
  const loginService=inject(LoginService);
  const router=inject(Router);

  const rol=loginService.token()?.rol;
  if(rol==="medico"){
    return true;
  }
  router.navigateByUrl("/ad");
  return false;
};
