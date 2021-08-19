import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyplanComponent } from './supplyplan.component';

describe('SupplyplanComponent', () => {
  let component: SupplyplanComponent;
  let fixture: ComponentFixture<SupplyplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
