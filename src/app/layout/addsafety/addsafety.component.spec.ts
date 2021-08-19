import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsafetyComponent } from './addsafety.component';

describe('AddsafetyComponent', () => {
  let component: AddsafetyComponent;
  let fixture: ComponentFixture<AddsafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
