import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpasswordgeneratepageComponent } from './userpasswordgeneratepage.component';

describe('UserpasswordgeneratepageComponent', () => {
  let component: UserpasswordgeneratepageComponent;
  let fixture: ComponentFixture<UserpasswordgeneratepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpasswordgeneratepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpasswordgeneratepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
