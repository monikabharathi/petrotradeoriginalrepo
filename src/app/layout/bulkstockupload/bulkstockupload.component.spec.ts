import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkstockuploadComponent } from './bulkstockupload.component';

describe('BulkstockuploadComponent', () => {
  let component: BulkstockuploadComponent;
  let fixture: ComponentFixture<BulkstockuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkstockuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkstockuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
