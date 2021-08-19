import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbulkstockComponent } from './editbulkstock.component';

describe('EditbulkstockComponent', () => {
  let component: EditbulkstockComponent;
  let fixture: ComponentFixture<EditbulkstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbulkstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbulkstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
