import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdailyforecastComponent } from './editdailyforecast.component';

describe('EditdailyforecastComponent', () => {
  let component: EditdailyforecastComponent;
  let fixture: ComponentFixture<EditdailyforecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdailyforecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdailyforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
