import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';

import * as Papa from 'papaparse';
import Chart from 'chart.js/auto';
import { EXC_DATES, QUEST, RESP_QUEST } from '../../constants/dates.constant';
import { IDateDiference, IFatalDay, IFatalities } from '../../interfaces/data-states.interface';

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
  description = '';

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
    this.description = '';

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
    
    console.warn(d.length, 'CANTIDAD DE CONDADOS');

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
    d.forEach((country:any) => {

        this.fataDay.push({
          country: country.Admin2,
          date: this.dayDiference(country,keysDates, country.Province_State).date,
          diference: Math.abs(this.dayDiference(country,keysDates, country.Province_State).mayorDiference),
          Province_State: country.Province_State
        })

    });

    this.fataDay = this.fataDay.sort((a,b )=> a.diference - b.diference);
    this.fatalitiesRef = Object.assign([], this.fatalities);
    this.generateChart(1);
  }

  dayDiference(d:any, dates:string[], state:string):IDateDiference{
    let group:IDateDiference[]=[];

    for(let i=0; i<dates.length; i++){

      let referA = dates[i];
      let referB = dates[i-1];

      let dateA = d[referA];
      let dateB = d[referB];

      let operation = dateA | dateB? (dateA)-(dateB):0;

      group.push({
        date: dates[i],
        mayorDiference: operation
      })
      dateA=0;
      dateB=0;
    }
    return group.sort((a,b) => a.mayorDiference - b.mayorDiference)[0]
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

    this.description = RESP_QUEST.mayor(loses.Province_State, loses.losses);
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
    this.description = RESP_QUEST.minor(loses.Province_State, loses.losses);
  }

  estadoMasAfectado(){
    let afecteds = this.fataDay.slice(-10);
    let countrys = afecteds.map( country => country.Province_State);
    let loses = afecteds.map(country => country.diference)

    this.more = new Chart('afectado', {
      type: 'doughnut',
      data: {
        labels: countrys, // Reemplaza 'label' con el nombre de tu columna de etiquetas.
        datasets: [{
          label: 'Cantidad de bajas por día',
          data: loses, // Reemplaza 'value' con el nombre de tu columna de valores.
          backgroundColor: this.rbgAleatorios(afecteds.length)
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
            text: countrys
          }
        }
      }
    });
    
    this.description = RESP_QUEST.afected(afecteds[afecteds.length - 1].date, afecteds[afecteds.length - 1].diference, afecteds[afecteds.length - 1].Province_State);
  }
  

}
