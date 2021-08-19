import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttimechangepasswordComponent } from './firsttimechangepassword.component';

describe('FirsttimechangepasswordComponent', () => {
  let component: FirsttimechangepasswordComponent;
  let fixture: ComponentFixture<FirsttimechangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirsttimechangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttimechangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
