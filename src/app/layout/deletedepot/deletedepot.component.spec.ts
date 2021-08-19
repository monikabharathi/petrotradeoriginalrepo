import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedepotComponent } from './deletedepot.component';

describe('DeletedepotComponent', () => {
  let component: DeletedepotComponent;
  let fixture: ComponentFixture<DeletedepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
