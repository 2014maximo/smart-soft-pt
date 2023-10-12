import { Component, OnInit } from '@angular/core';
import { ISale } from '../../interfaces/people.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  group:any;
  sale:ISale;

  constructor() { }

  ngOnInit(): void {
  }

  updateState(e:any){
    this.group = e;
  }

  editSale(s:ISale){
    this.sale = s;
  }

}
