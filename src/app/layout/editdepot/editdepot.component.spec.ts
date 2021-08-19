import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdepotComponent } from './editdepot.component';

describe('EditdepotComponent', () => {
  let component: EditdepotComponent;
  let fixture: ComponentFixture<EditdepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
