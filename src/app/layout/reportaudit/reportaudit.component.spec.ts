import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportauditComponent } from './reportaudit.component';

describe('ReportauditComponent', () => {
  let component: ReportauditComponent;
  let fixture: ComponentFixture<ReportauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
