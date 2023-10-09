import { Component, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';

import { Chart } from 'chart.js';
import { ComunicationService } from '../../services/comunication.service';
@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.scss']
})
export class LoadFileComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  @Output() change: EventEmitter<boolean> =  new EventEmitter();

  files: any[] = [];
  data: any[] = [];
  chart: any;

  constructor(private comunication: ComunicationService) { }

  ngOnInit(): void {
  }

  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.files);
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
            this.change.emit(true);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }

    this.sendData(this.files);
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  sendData(dat: any) {
    this.comunication.setData(dat);
  }

  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  parseCSV(f: any) {
    /*       const csv = 'tu-archivo.csv'; // Reemplaza con la ruta de tu archivo CSV
          Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              this.data = result.data;
              // Luego, puedes utilizar los datos para generar una gráfica.
              this.generateChart();
            }
          }); */
  }

  generateChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.data.map(item => item.label), // Reemplaza 'label' con el nombre de tu columna de etiquetas.
        datasets: [{
          label: 'Datos desde CSV',
          data: this.data.map(item => item.value), // Reemplaza 'value' con el nombre de tu columna de valores.
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
