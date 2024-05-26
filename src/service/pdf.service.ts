import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    this.loadCustomFonts();
  }

  async loadCustomFonts() {
    const fontPath = 'assets/fonts/Kalpurush.ttf';
    const font = await this.loadFont(fontPath);

    pdfMake.vfs['Kalpurush.ttf'] = font;
    (pdfMake as any).fonts = {
      ...pdfMake.fonts,
      Kalpurush: {
        normal: 'Kalpurush.ttf',
        bold: 'Kalpurush.ttf',
        italics: 'Kalpurush.ttf',
        bolditalics: 'Kalpurush.ttf'
      }
    };
  }

  loadFont(url: string): Promise<string> {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
        return btoa(binary);
      });
  }

  async generatePdf() {
    await this.loadCustomFonts();

    const documentDefinition = {
      content: [
        {
          text: 'বাংলা ভাষার উদাহরণ',
          style: 'header'
        },
        {
          text: 'এটি একটি নমুনা পিডিএফ ডকুমেন্ট যা pdfmake ব্যবহার করে তৈরি করা হয়েছে।'
        }
      ],
      defaultStyle: {
        font: 'Kalpurush'
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('bangla-sample.pdf');
  }
}
