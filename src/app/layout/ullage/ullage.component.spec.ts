import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UllageComponent } from './ullage.component';

describe('UllageComponent', () => {
  let component: UllageComponent;
  let fixture: ComponentFixture<UllageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UllageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UllageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
