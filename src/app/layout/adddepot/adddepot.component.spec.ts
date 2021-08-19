import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddepotComponent } from './adddepot.component';

describe('AdddepotComponent', () => {
  let component: AdddepotComponent;
  let fixture: ComponentFixture<AdddepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
