import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastweekComponent } from './forecastweek.component';

describe('ForecastweekComponent', () => {
  let component: ForecastweekComponent;
  let fixture: ComponentFixture<ForecastweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
