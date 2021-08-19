import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsupplyplanComponent } from './viewsupplyplan.component';

describe('ViewsupplyplanComponent', () => {
  let component: ViewsupplyplanComponent;
  let fixture: ComponentFixture<ViewsupplyplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsupplyplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsupplyplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
