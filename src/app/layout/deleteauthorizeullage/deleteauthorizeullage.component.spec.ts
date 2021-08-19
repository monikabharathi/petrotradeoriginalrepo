import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizeullageComponent } from './deleteauthorizeullage.component';

describe('DeleteauthorizeullageComponent', () => {
  let component: DeleteauthorizeullageComponent;
  let fixture: ComponentFixture<DeleteauthorizeullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizeullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizeullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
