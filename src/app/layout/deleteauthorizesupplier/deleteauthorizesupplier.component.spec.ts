import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizesupplierComponent } from './deleteauthorizesupplier.component';

describe('DeleteauthorizesupplierComponent', () => {
  let component: DeleteauthorizesupplierComponent;
  let fixture: ComponentFixture<DeleteauthorizesupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizesupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
