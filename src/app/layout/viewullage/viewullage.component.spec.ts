import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewullageComponent } from './viewullage.component';

describe('ViewullageComponent', () => {
  let component: ViewullageComponent;
  let fixture: ComponentFixture<ViewullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
