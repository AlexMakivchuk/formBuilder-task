import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStyleCheckboxComponent } from 'src/app/core/components/expansion-panel/components/form-style-checkbox/form-style-checkbox.component';

describe('FormStyleCheckboxComponent', () => {
  let component: FormStyleCheckboxComponent;
  let fixture: ComponentFixture<FormStyleCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStyleCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStyleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
