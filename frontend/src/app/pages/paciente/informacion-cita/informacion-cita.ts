import { CitaService } from '@/services/cita-service';
import { LoginService } from '@/services/login-service';
import { PdfService } from '@/services/pdf-service';
import { ReportesService } from '@/services/reportes-service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-informacion-cita',
  imports: [CardModule,ButtonModule],
  templateUrl: './informacion-cita.html',
  styleUrl: './informacion-cita.scss',
  providers: [MessageService]

})
export class InformacionCita implements OnInit {
  
  
cita!: any;
idUser:any;
constructor(
   private citaService: CitaService,
   private loginService: LoginService,
   private pdfService: PdfService,
   private reportesService: ReportesService,
   private router: Router,
    private messageService: MessageService,
  ) {}

ngOnInit(): void {
  // Captura el parámetro 'id'
  this.idUser = this.loginService.token()?.id;
  console.log(this.idUser);
  
  if (this.idUser) {
    // Llamada al backend para obtener la cita
    this.citaService.citaActual(this.idUser).subscribe(res => {
      this.cita = res.data;
    });
  }
}
  
  cancelarCita(id:number){
    this.citaService.eliminarCita(id).subscribe({
      next:d=>{
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Cita eliminada correctamente'});
      this.router.navigateByUrl("/pages/paciente");
      },
      error:e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:e.error.message});

      }
    });
  }
  generarBoleta(){
    this.reportesService.boletaReserva(this.idUser).subscribe(d=>{
      this.pdfService.generarBoleta(d);
    });
  }

}
