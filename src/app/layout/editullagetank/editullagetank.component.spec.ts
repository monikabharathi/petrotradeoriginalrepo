import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditullagetankComponent } from './editullagetank.component';

describe('EditullagetankComponent', () => {
  let component: EditullagetankComponent;
  let fixture: ComponentFixture<EditullagetankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditullagetankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditullagetankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
