import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  generarBoleta(cita:any) {

    const docDefinition: any = {
      content: [
        { text: 'Boleta de Reserva de Cita', style: 'header', alignment: 'center' },
        { text: '\n' },
        {
  style: 'tableExample',
  table: {
    widths: ['*', '*', '*', '*'],
    body: [
      [
        { text: 'Paciente', style:'alto',border:[false,false,false,false] }, { text: cita.paciente, style:'alto',border:[false,false,false,false] },
        { text: 'Médico', style:'alto',border:[false,false,false,false] }, { text: cita.medico, style:'alto',border:[false,false,false,false] }
      ],
      [
        { text: 'Especialidad', style:'alto',border:[false,false,false,false] }, { text: cita.especialidad, style:'alto',border:[false,false,false,false] },
        { text: 'Fecha', style:'alto',border:[false,false,false,false] }, { text: cita.fecha, style:'alto',border:[false,false,false,false] }
      ],
      [
        { text: 'Hora desde', style:'alto',border:[false,false,false,false] }, { text: cita.desde, style:'alto',border:[false,false,false,false] },
        { text: 'Hora hasta', style:'alto',border:[false,false,false,false] }, { text: cita.hasta, style:'alto',border:[false,false,false,false] }
      ],
      [{ text: 'Estado', style:'alto',border:[false,false,false,false] }, { text: cita.estado === 'S' ? 'Confirmada' : cita.estado, style:'alto',border:[false,false,false,false] },
      {text:'',border:[false,false,false,false]},{text:'',border:[false,false,false,false]}]
    ]
  },
  layout: 'lightHorizontalLines'
}
,
        
        { text: '\nGracias por reservar su cita.', alignment: 'center' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        alto: {
          margin: [0, 5, 0, 5]
        }
      },
      pageSize: 'A5',
      pageOrientation: 'landscape',
      pageMargins: [10, 100, 10, 10]
    };

    pdfMake.createPdf(docDefinition).open(); // también puedes usar .download('boleta.pdf')
  }
}
