import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeleteauthorizedepotComponent } from './viewdeleteauthorizedepot.component';

describe('ViewdeleteauthorizedepotComponent', () => {
  let component: ViewdeleteauthorizedepotComponent;
  let fixture: ComponentFixture<ViewdeleteauthorizedepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdeleteauthorizedepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeleteauthorizedepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
