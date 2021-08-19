import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizedepotComponent } from './deleteauthorizedepot.component';

describe('DeleteauthorizedepotComponent', () => {
  let component: DeleteauthorizedepotComponent;
  let fixture: ComponentFixture<DeleteauthorizedepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizedepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizedepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
