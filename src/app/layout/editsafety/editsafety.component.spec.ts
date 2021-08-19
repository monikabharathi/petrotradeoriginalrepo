import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsafetyComponent } from './editsafety.component';

describe('EditsafetyComponent', () => {
  let component: EditsafetyComponent;
  let fixture: ComponentFixture<EditsafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
