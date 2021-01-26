import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStyleButtonComponent } from './form-style-button.component';

describe('FormStyleButtonComponent', () => {
  let component: FormStyleButtonComponent;
  let fixture: ComponentFixture<FormStyleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStyleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStyleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
