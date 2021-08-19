import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizeuserComponent } from './deleteauthorizeuser.component';

describe('DeleteauthorizeuserComponent', () => {
  let component: DeleteauthorizeuserComponent;
  let fixture: ComponentFixture<DeleteauthorizeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
