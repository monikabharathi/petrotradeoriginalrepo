import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbulkstockComponent } from './reportbulkstock.component';

describe('ReportbulkstockComponent', () => {
  let component: ReportbulkstockComponent;
  let fixture: ComponentFixture<ReportbulkstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbulkstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbulkstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
