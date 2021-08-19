import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeleteauthorizeullageComponent } from './viewdeleteauthorizeullage.component';

describe('ViewdeleteauthorizeullageComponent', () => {
  let component: ViewdeleteauthorizeullageComponent;
  let fixture: ComponentFixture<ViewdeleteauthorizeullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdeleteauthorizeullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeleteauthorizeullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
