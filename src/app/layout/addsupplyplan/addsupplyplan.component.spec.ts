import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsupplyplanComponent } from './addsupplyplan.component';

describe('AddsupplyplanComponent', () => {
  let component: AddsupplyplanComponent;
  let fixture: ComponentFixture<AddsupplyplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsupplyplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsupplyplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
