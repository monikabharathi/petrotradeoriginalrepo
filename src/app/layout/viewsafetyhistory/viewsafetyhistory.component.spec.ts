import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsafetyhistoryComponent } from './viewsafetyhistory.component';

describe('ViewsafetyhistoryComponent', () => {
  let component: ViewsafetyhistoryComponent;
  let fixture: ComponentFixture<ViewsafetyhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsafetyhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsafetyhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
