import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeleteauthorizesupplierComponent } from './viewdeleteauthorizesupplier.component';

describe('ViewdeleteauthorizesupplierComponent', () => {
  let component: ViewdeleteauthorizesupplierComponent;
  let fixture: ComponentFixture<ViewdeleteauthorizesupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdeleteauthorizesupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeleteauthorizesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
