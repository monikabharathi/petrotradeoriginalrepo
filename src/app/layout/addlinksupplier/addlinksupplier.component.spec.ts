import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlinksupplierComponent } from './addlinksupplier.component';

describe('AddlinksupplierComponent', () => {
  let component: AddlinksupplierComponent;
  let fixture: ComponentFixture<AddlinksupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlinksupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlinksupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
