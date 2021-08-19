import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddullageComponent } from './addullage.component';

describe('AddullageComponent', () => {
  let component: AddullageComponent;
  let fixture: ComponentFixture<AddullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
