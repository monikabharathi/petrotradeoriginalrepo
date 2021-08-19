import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizedataprofileComponent } from './deleteauthorizedataprofile.component';

describe('DeleteauthorizedataprofileComponent', () => {
  let component: DeleteauthorizedataprofileComponent;
  let fixture: ComponentFixture<DeleteauthorizedataprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizedataprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizedataprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
