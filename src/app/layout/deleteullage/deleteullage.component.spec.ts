import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteullageComponent } from './deleteullage.component';

describe('DeleteullageComponent', () => {
  let component: DeleteullageComponent;
  let fixture: ComponentFixture<DeleteullageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteullageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteullageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
