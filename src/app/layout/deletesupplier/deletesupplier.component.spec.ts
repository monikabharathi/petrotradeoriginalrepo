import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesupplierComponent } from './deletesupplier.component';

describe('DeletesupplierComponent', () => {
  let component: DeletesupplierComponent;
  let fixture: ComponentFixture<DeletesupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
