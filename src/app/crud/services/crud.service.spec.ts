import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';



describe('CrudService', () => {
  let service: CrudService;
  let items;
  
  beforeEach(() => {
    service.getMethodPayment().subscribe(resp => {items = resp});
    TestBed.configureTestingModule({});
    providers: [CrudService]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of items', () => {
    // Realiza las expectativas para los datos devueltos por el método getItems()
    expect(items).toBeDefined();
    expect(items.length).toBeGreaterThan(0); // Asegúrate de que la lista no esté vacía o que tenga elementos
    // Puedes realizar más expectativas específicas según el comportamiento esperado.
  });
});
