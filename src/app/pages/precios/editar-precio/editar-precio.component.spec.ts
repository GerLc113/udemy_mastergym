import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrecioComponent } from './editar-precio.component';

describe('EditarPrecioComponent', () => {
  let component: EditarPrecioComponent;
  let fixture: ComponentFixture<EditarPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
