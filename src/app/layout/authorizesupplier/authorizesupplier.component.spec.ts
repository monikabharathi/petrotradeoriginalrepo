import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizesupplierComponent } from './authorizesupplier.component';

describe('AuthorizesupplierComponent', () => {
  let component: AuthorizesupplierComponent;
  let fixture: ComponentFixture<AuthorizesupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizesupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
