import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbulkstockComponent } from './addbulkstock.component';

describe('AddbulkstockComponent', () => {
  let component: AddbulkstockComponent;
  let fixture: ComponentFixture<AddbulkstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbulkstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbulkstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
