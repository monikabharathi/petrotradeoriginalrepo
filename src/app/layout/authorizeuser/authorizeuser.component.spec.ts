import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeuserComponent } from './authorizeuser.component';

describe('AuthorizeuserComponent', () => {
  let component: AuthorizeuserComponent;
  let fixture: ComponentFixture<AuthorizeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
