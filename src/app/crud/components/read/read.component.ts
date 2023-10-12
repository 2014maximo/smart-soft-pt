import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { PAGES } from '../../constants/crud.constant';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  listSales: any[] = [];
  listSalesLoad: any[] = [];
  groupSales: any[] = [];
  active='';

  @Input() public change: any;
  pages=PAGES;

  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.chargeList();
    }  
  }

  chargeList(){
    this.crudService.list(1).subscribe(resp => {
      this.listSales = this.listSalesLoad = resp;
      this.chargeResults();
    });
  }

  chargeResults(cant: number = 10){
    // eje 10 o 20
    let pagin = Math.round(this.listSales.length/10);
    let counter = 0;
    this.pages=[];
    for(let i=0; i < pagin; i++){
      this.pages.push(PAGES[i]);
    }
    this.listSales = Object.assign([],this.listSalesLoad)
    if(pagin > 1){
      let division = this.listSales.length/cant;
      for(let j=0; j<this.listSales.length; j+=cant){
        this.listSalesLoad = this.listSales;
        this.groupSales[counter] = {
          page: counter,
          content:this.listSalesLoad.slice((counter * cant), (counter + 1) * cant)
        }
        counter++;
      }
    }
    console.log(this.groupSales, 'miremoslo');

    setTimeout(()=>{
      
    },100)
  }

  reallocate(e:any,page:number){
    this.chargeResults(+e.target.value);
    this.listSales = this.groupSales[page].content;
    console.log(e.srcElement.value, 'CAMBIO');
  }

  loadContent(page:number){
    this.active = page.toString();
    this.listSales = this.groupSales[page]?.content;
  }

}
