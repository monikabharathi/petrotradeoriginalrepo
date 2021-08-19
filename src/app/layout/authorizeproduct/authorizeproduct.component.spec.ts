import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeproductComponent } from './authorizeproduct.component';

describe('AuthorizeproductComponent', () => {
  let component: AuthorizeproductComponent;
  let fixture: ComponentFixture<AuthorizeproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
