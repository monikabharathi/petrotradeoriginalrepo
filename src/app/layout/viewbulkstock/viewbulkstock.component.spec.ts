import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbulkstockComponent } from './viewbulkstock.component';

describe('ViewbulkstockComponent', () => {
  let component: ViewbulkstockComponent;
  let fixture: ComponentFixture<ViewbulkstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbulkstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbulkstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
