import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorizeullageComponent } from './viewauthorizeullage.component';

describe('ViewauthorizeullageComponent', () => {
  let component: ViewauthorizeullageComponent;
  let fixture: ComponentFixture<ViewauthorizeullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorizeullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorizeullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
