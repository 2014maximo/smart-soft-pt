import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.scss']
})
export class ReadCsvComponent implements OnInit {

  active=false;

  constructor() { }

  ngOnInit(): void {
  }

  detectTransition(e:boolean){
    this.active = e;
  }


  }