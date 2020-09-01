import { TestBed } from '@angular/core/testing';

import { DuracionesService } from './duraciones.service';

describe('DuracionesService', () => {
  let service: DuracionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuracionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
