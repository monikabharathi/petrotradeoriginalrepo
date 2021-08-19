import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportviewbulkstockComponent } from './reportviewbulkstock.component';

describe('ReportviewbulkstockComponent', () => {
  let component: ReportviewbulkstockComponent;
  let fixture: ComponentFixture<ReportviewbulkstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportviewbulkstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportviewbulkstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
