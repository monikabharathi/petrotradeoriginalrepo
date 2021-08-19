import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorizeuserComponent } from './viewauthorizeuser.component';

describe('ViewauthorizeuserComponent', () => {
  let component: ViewauthorizeuserComponent;
  let fixture: ComponentFixture<ViewauthorizeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorizeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorizeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
