import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorizeproductComponent } from './viewauthorizeproduct.component';

describe('ViewauthorizeproductComponent', () => {
  let component: ViewauthorizeproductComponent;
  let fixture: ComponentFixture<ViewauthorizeproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorizeproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorizeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
