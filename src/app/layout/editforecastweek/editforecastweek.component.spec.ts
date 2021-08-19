import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditforecastweekComponent } from './editforecastweek.component';

describe('EditforecastweekComponent', () => {
  let component: EditforecastweekComponent;
  let fixture: ComponentFixture<EditforecastweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditforecastweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditforecastweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
