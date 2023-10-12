import { Component, Input, SimpleChanges, ViewChild, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ISale } from '../../interfaces/people.interface';

// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

declare var $: any;
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  @Input() public change: boolean;
  @Input() public sal: ISale;
  @Output() sale: EventEmitter<ISale> =  new EventEmitter();

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('deleteSale') deleteSale: ElementRef;

  displayedColumns: string[] = ['pointSale', 'commercialAdvisor', 'date', 'salesValue', 'phone'];
  dataSourceRef:ISale[]=[];
  dataSource = new MatTableDataSource<ISale>([]);
  actualSale:ISale;

  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.chargeList();
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Items por página';

    });
  }  

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.chargeList();
    }  
  }

  chargeList(){
    this.crudService.list(1).subscribe(resp => {
      this.dataSourceRef = this.dataSource.data = resp;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: any) {
    this.sale.emit(element);
  }
  
  delete(element: ISale) {
    $('#deleteSale').modal('show');
    this.actualSale = element;
  }

  processDelete(){
    $('#deleteSale').modal('hide');
    this.crudService.deleteSale(this.actualSale.id).subscribe({
      next:(resp)=>{
        this.chargeList();
      },
      error:(e)=>{
        console.error(e);
      }
    })
  }

  addData() {
    this.dataSource.data = Object.assign([], this.dataSourceRef);
  }

  removeData() {
    this.dataSource.data = [];
  }


}
