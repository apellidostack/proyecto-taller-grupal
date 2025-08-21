import { CitaService } from "@/services/cita-service";
import { LoginService } from "@/services/login-service";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { catchError, map, of } from "rxjs";

export const citaActualResolver: ResolveFn<any> = () => {
  const citaService = inject(CitaService);
  const loginService = inject(LoginService);

  const usuarioId = loginService.token()?.id ?? null;
    console.log(usuarioId);
    
  return citaService.citaActual(usuarioId).pipe(
    map(res => res?.data ?? null),
    catchError(() => of(null)) // devuelve null en caso de error
  );
};
