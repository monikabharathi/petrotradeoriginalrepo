import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewullagetankComponent } from './viewullagetank.component';

describe('ViewullagetankComponent', () => {
  let component: ViewullagetankComponent;
  let fixture: ComponentFixture<ViewullagetankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewullagetankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewullagetankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
