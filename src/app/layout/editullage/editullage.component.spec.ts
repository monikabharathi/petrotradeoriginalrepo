import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditullageComponent } from './editullage.component';

describe('EditullageComponent', () => {
  let component: EditullageComponent;
  let fixture: ComponentFixture<EditullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
