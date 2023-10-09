import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';

import * as Papa from 'papaparse';
import Chart from 'chart.js/auto';
import { EXC_DATES, QUEST } from '../../constants/dates.constant';
import { IDateDiference, IFatalDay, IFatalities } from '../../interfaces/data-states.interface';
import { AnimationStyleMetadata } from '@angular/animations';

@Component({
  selector: 'app-grafic',
  templateUrl: './grafic.component.html',
  styleUrls: ['./grafic.component.scss']
})
export class GraficComponent implements OnInit {
  chart: any;
  max:any;
  min:any;
  more:any;
  data: any;
  csvData: any[] = [];
  fatalities: IFatalities[]=[];
  fatalitiesRef: IFatalities[]=[];
  fataDay: IFatalDay[]=[];

  nStates: string[]=[];
  grafic='';

  constructor( private comunication:ComunicationService) {
    this.comunication.data$.subscribe((data) => {
      this.data = data[0];
      this.parseCSV(this.data)
    });
  }

  ngOnInit(): void {
  }

  parseCSV(file: File): void {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        this.csvData = result.data;
        this.mapingJson(this.csvData);
        // Aquí puedes realizar acciones adicionales con los datos CSV
      },
      error: (error) => {
        console.error('Error al analizar el archivo CSV:', error);
      }
    });
  }

  generateChart(chart:number) {

    switch(chart){
      case 1:
        this.grafic = 'mayor';
        setTimeout(()=>{
          this.mayorAcumulado();
        });
        break
      
      case 2:
        this.grafic = 'menor';
        setTimeout(()=>{
          this.menorAcumulado();
        });
        break
      
      case 3:
        this.grafic = 'afectado';
        setTimeout(()=>{
          this.estadoMasAfectado();
        });
        break
    }
  }

  private mapingJson(d:any){
    let ref = Object.keys(d[0]);
    let studyStates:string[]=[];
    let keysDates: string[]=[];
    

    d.forEach((ob)=>{studyStates.push(ob.Province_State)});
    studyStates.forEach((ee)=>{!this.nStates.includes(ee)? this.nStates.push(ee):''});
    ref.forEach((e)=>{!EXC_DATES.includes(e)? keysDates.push(e) : ''});
    keysDates = keysDates.sort( function compararFechas(a, b) {
      // Convierte las fechas a objetos Date para que puedan compararse
      var fechaA = new Date('20' + a.replace(/(\d{1,2})\/(\d{1,2})\/(\d{2})/, '$3-$1-$2'));
      var fechaB = new Date('20' + b.replace(/(\d{1,2})\/(\d{1,2})\/(\d{2})/, '$3-$1-$2'));
    
      // Compara las fechas y devuelve el resultado de la comparación
      if (fechaA < fechaB) {
        return -1;
      } else if (fechaA > fechaB) {
        return 1;
      } else {
        return 0;
      }
    });

    console.log(keysDates, 'FECHAS ORDENAS');

    this.nStates.forEach((f) => {
      let aState = d.filter(est => est.Province_State.includes(f));
      let less = 0;
      let citizens = 0;
      aState.forEach( neighborhood => {
        less += neighborhood['4/27/21'];
        citizens+=neighborhood.Population;
      });
      this.fatalities.push({
        Province_State: f,
        losses: less,
        citizens: citizens,
        percent: Number(((less/citizens)*100).toFixed(6))
      });
    });
    console.log(d.length, 'CANTIDAD DE BARRIOS TOTALES');
    d.forEach((country:any) => {
        this.fataDay.push({
          country: country.Admin2,
          date: this.dayDiference(country,keysDates, country.Province_State).date,
          diference: this.dayDiference(country,keysDates, country.Province_State).mayorDiference,
          Province_State: country.Province_State
        })

    });

    // console.log(this.fataDay, 'TOTAL');
    this.fatalitiesRef = Object.assign([], this.fatalities);
    this.generateChart(1);
  }

  dayDiference(d:any, dates:string[], state:string):IDateDiference{
    let group:IDateDiference[]=[];

    for(let i=0; i<dates.length; i++){
      let dateA = d[dates[i]];
      let dateB = d[dates[i-1]];
      group.push({
        date: dates[i],
        mayorDiference: (dateA)-(dateB)
      })
      dateA=0;
      dateB=0;
    }
    return group.sort((a,b) => a.mayorDiference + b.mayorDiference)[0]
  }

  rbgAleatorios(cant:number):string[]{

    let colors:string[]=[];

    for(let i=0; i < cant; i++){
      colors.push(`rgb(${this.toneRGB()},${this.toneRGB()},${this.toneRGB()})`)
    }
    return colors
  }

  toneRGB():number {
    return Math.floor(Math.random() * 255) + 1;
  }

  mayorAcumulado(){
    this.fatalitiesRef = Object.assign([], this.fatalities);

    let loses = this.fatalitiesRef.sort(((a, b) => a.losses + b.losses))[0];

    this.max = new Chart('mayor', {
      type: 'doughnut',
      data: {
        labels: QUEST.mayorAcumulado(loses.citizens,loses.losses), // Reemplaza 'label' con el nombre de tu columna de etiquetas.
        datasets: [{
          label: 'Número de habitantes',
          data: [loses.citizens,loses.losses], // Reemplaza 'value' con el nombre de tu columna de valores.
          backgroundColor: this.rbgAleatorios(2)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: loses.Province_State
          }
        }
      }
    });
  }

  menorAcumulado(){

    this.fatalitiesRef = Object.assign([], this.fatalities);
    let loses = this.fatalitiesRef.sort(((a, b) => a.losses - b.losses))[0];


    this.min = new Chart('menor', {
      type: 'doughnut',
      data: {
        labels: QUEST.menorAcumulado(loses.citizens,loses.losses), // Reemplaza 'label' con el nombre de tu columna de etiquetas.
        datasets: [{
          label: 'Número de habitantes',
          data: [loses.citizens,loses.losses], // Reemplaza 'value' con el nombre de tu columna de valores.
          backgroundColor: this.rbgAleatorios(2)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: loses.Province_State
          }
        }
      }
    });
  }

  estadoMasAfectado(){
    let loses = this.fatalities.sort(((a, b) => a.losses - b.losses))[0];

    this.more = new Chart('menor', {
      type: 'doughnut',
      data: {
        labels: QUEST.mayorAcumulado(loses.citizens,loses.losses), // Reemplaza 'label' con el nombre de tu columna de etiquetas.
        datasets: [{
          label: 'Número de habitantes',
          data: [loses.citizens,loses.losses], // Reemplaza 'value' con el nombre de tu columna de valores.
          backgroundColor: this.rbgAleatorios(2)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: loses.Province_State
          }
        }
      }
    });
  }
  

}
