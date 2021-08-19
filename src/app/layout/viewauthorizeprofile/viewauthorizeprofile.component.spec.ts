import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorizeprofileComponent } from './viewauthorizeprofile.component';

describe('ViewauthorizeprofileComponent', () => {
  let component: ViewauthorizeprofileComponent;
  let fixture: ComponentFixture<ViewauthorizeprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorizeprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorizeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
