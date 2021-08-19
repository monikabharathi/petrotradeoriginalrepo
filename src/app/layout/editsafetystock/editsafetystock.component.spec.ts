import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsafetystockComponent } from './editsafetystock.component';

describe('EditsafetystockComponent', () => {
  let component: EditsafetystockComponent;
  let fixture: ComponentFixture<EditsafetystockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsafetystockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsafetystockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
