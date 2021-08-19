import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeleteauthorizeuserComponent } from './viewdeleteauthorizeuser.component';

describe('ViewdeleteauthorizeuserComponent', () => {
  let component: ViewdeleteauthorizeuserComponent;
  let fixture: ComponentFixture<ViewdeleteauthorizeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdeleteauthorizeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdeleteauthorizeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
