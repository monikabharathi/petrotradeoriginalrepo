import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsafetyComponent } from './viewsafety.component';

describe('ViewsafetyComponent', () => {
  let component: ViewsafetyComponent;
  let fixture: ComponentFixture<ViewsafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
