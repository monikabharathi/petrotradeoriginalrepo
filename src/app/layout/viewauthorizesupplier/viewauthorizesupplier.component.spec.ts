import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorizesupplierComponent } from './viewauthorizesupplier.component';

describe('ViewauthorizesupplierComponent', () => {
  let component: ViewauthorizesupplierComponent;
  let fixture: ComponentFixture<ViewauthorizesupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorizesupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorizesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
