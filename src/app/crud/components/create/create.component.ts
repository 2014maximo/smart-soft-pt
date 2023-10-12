import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISale, ITypeDocument } from '../../interfaces/people.interface';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Input() public sal: ISale;
  @Output() created: EventEmitter<boolean> =  new EventEmitter();
  @ViewChild('createSale') createSale: ElementRef;

  form: FormGroup;
  listTypeDocument: ITypeDocument[];
  methodPayment: ITypeDocument[];
  validate = false;

  constructor(private fb:FormBuilder, private crudService: CrudService) {
    this.form = this.createForm();
    this.loadTypeDocument();
    this.loadMethodPayment();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.form.patchValue(this.sal);
    }  
  }

  private loadTypeDocument(){
    this.crudService.getTypeDocument().subscribe({
      next: (resp) => {
        this.listTypeDocument = resp;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  private loadMethodPayment(){
    this.crudService.getMethodPayment().subscribe({
      next:(resp) => {
        this.methodPayment = resp;
      },
      error:(e) => {
        console.error(e);
      }
    })
  }

  createForm():FormGroup{
    return this.fb.group({
      id:new FormControl({value: '', disabled: false}),
      typeDocument:new FormControl({ value: '', disabled: false }, Validators.required),
      numberDocument:new FormControl({ value: '', disabled: false }, Validators.required),
      nameCustomer:new FormControl({ value: '', disabled: false }, Validators.required),
      lastCustomer:new FormControl({ value: '', disabled: false }, Validators.required),
      email:new FormControl({ value: '', disabled: false }, Validators.required),
      phone:new FormControl({ value: '', disabled: false }, Validators.required),
      typeShipping:new FormControl({ value: '', disabled: false }, Validators.required),
      operator:new FormControl({ value: '', disabled: false }, Validators.required),
      numberPackages:new FormControl({ value: '', disabled: false }, Validators.required),
      guide:new FormControl({ value: '', disabled: false }, Validators.required),
      salesValue:new FormControl({ value: '', disabled: false }, Validators.required),
      methodPayment:new FormControl({ value: '', disabled: false }, Validators.required),
      pointSale:new FormControl({ value: '', disabled: false }, Validators.required),
      date:new FormControl({ value: '', disabled: false }, Validators.required),
      commercialAdvisor:new FormControl({ value: '', disabled: false }, Validators.required)
    })
  }

  send(){
    this.validate = true;
    this.form.get('date').setValue(new Date());
    this.form.setValidators;

    if(this.form.valid){
      if(this.form.value.id){
        this.processUpdate();
      } else {
        this.processSave();
      }
    } 
  }

  processSave(){
    this.crudService.saveSale(this.form.value).subscribe({
      next:(resp) => {
        this.readyForm();
      },
      error:(e)=>{
        console.error(e);
      }
    })
  }

  processUpdate(){
    this.crudService.updateSale(this.form.value).subscribe({
      next:(resp)=>{
        this.readyForm();
      },
      error(err) {
          console.error(err);
      },
    })
  }

  readyForm(){
    this.created.emit(true);
    this.createSale.nativeElement.click();
    this.form.clearValidators();
    this.form.reset();
  }

}
