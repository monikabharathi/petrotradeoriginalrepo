import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdepotComponent } from './viewdepot.component';

describe('ViewdepotComponent', () => {
  let component: ViewdepotComponent;
  let fixture: ComponentFixture<ViewdepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
