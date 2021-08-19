import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeullageComponent } from './authorizeullage.component';

describe('AuthorizeullageComponent', () => {
  let component: AuthorizeullageComponent;
  let fixture: ComponentFixture<AuthorizeullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
