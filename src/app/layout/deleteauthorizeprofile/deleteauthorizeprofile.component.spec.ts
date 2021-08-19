import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizeprofileComponent } from './deleteauthorizeprofile.component';

describe('DeleteauthorizeprofileComponent', () => {
  let component: DeleteauthorizeprofileComponent;
  let fixture: ComponentFixture<DeleteauthorizeprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizeprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
