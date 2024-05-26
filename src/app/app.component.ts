import { Component } from '@angular/core';
import { PdfService } from 'src/service/pdf.service';


@Component({
  selector: 'app-root',
  template: `<button (click)="createPdf()">Generate PDF</button>`,
  styles: []
})
export class AppComponent {
  constructor(private pdfService: PdfService) {}

  createPdf() {
    this.pdfService.generatePdf();
  }
}
