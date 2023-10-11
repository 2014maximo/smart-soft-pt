import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ISale } from '../../interfaces/people.interface';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  @Input() public listSales: any[] = [];


  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.crudService.list(1).subscribe(resp => {
      this.listSales = resp;
    })
  }

}
