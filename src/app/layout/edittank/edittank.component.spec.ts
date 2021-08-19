import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittankComponent } from './edittank.component';

describe('EdittankComponent', () => {
  let component: EdittankComponent;
  let fixture: ComponentFixture<EdittankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
