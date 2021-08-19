import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkstockComponent } from './bulkstock.component';

describe('BulkstockComponent', () => {
  let component: BulkstockComponent;
  let fixture: ComponentFixture<BulkstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
