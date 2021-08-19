import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauthorizeproductComponent } from './deleteauthorizeproduct.component';

describe('DeleteauthorizeproductComponent', () => {
  let component: DeleteauthorizeproductComponent;
  let fixture: ComponentFixture<DeleteauthorizeproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteauthorizeproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauthorizeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
