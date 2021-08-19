import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeleteauthorizeproductComponent } from './viewdeleteauthorizeproduct.component';

describe('ViewdeleteauthorizeproductComponent', () => {
  let component: ViewdeleteauthorizeproductComponent;
  let fixture: ComponentFixture<ViewdeleteauthorizeproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdeleteauthorizeproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeleteauthorizeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
