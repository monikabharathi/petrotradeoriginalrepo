import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorizedepotComponent } from './viewauthorizedepot.component';

describe('ViewauthorizedepotComponent', () => {
  let component: ViewauthorizedepotComponent;
  let fixture: ComponentFixture<ViewauthorizedepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorizedepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorizedepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
