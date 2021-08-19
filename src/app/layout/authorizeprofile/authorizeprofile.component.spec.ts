import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeprofileComponent } from './authorizeprofile.component';

describe('AuthorizeprofileComponent', () => {
  let component: AuthorizeprofileComponent;
  let fixture: ComponentFixture<AuthorizeprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
