import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddforecastweekComponent } from './addforecastweek.component';

describe('AddforecastweekComponent', () => {
  let component: AddforecastweekComponent;
  let fixture: ComponentFixture<AddforecastweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddforecastweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddforecastweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
