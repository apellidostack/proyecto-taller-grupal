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







  generarPDF(listaCitas:any[]) {

    // Preparar filas de la tabla
    const body = [
    ['ID', 'Nombre', 'Fecha', 'Hora Inicio', 'Hora Final', 'Estado'] // encabezado
  ];

  listaCitas.forEach(cita => {
    const estadoStr = cita.estado === 'S' ? 'Vigente' : 'Pasado';
    
    // Formatear fecha tipo fullDate en español
    const fechaFormateada = new Date(cita.fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    body.push([
      cita.cita_id,
      cita.paciente,
      fechaFormateada,
      cita.hora_inicio.substring(0, 5), // HH:mm
      cita.hora_fin.substring(0, 5),    // HH:mm
      estadoStr
    ]);
  });

  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      { text: 'Reporte de Citas', style: 'header', marginBottom: 20 },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', 'auto', 'auto', 'auto'],
          body: body
        },
        layout: {
          fillColor: (rowIndex: number) => rowIndex === 0 ? '#CCCCCC' : null
        }
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true, alignment: 'center' }
    }
  };

  pdfMake.createPdf(docDefinition).open();
}
}
