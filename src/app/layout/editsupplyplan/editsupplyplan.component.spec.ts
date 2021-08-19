import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsupplyplanComponent } from './editsupplyplan.component';

describe('EditsupplyplanComponent', () => {
  let component: EditsupplyplanComponent;
  let fixture: ComponentFixture<EditsupplyplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsupplyplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsupplyplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
