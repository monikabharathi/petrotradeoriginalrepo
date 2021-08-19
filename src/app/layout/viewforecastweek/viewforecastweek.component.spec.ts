import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewforecastweekComponent } from './viewforecastweek.component';

describe('ViewforecastweekComponent', () => {
  let component: ViewforecastweekComponent;
  let fixture: ComponentFixture<ViewforecastweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewforecastweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewforecastweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
