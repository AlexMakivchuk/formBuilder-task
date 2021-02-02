import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStyleInputComponent } from 'src/app/core/components/expansion-panel/components/form-style-input/form-style-input.component';

describe('FormStyleInputComponent', () => {
  let component: FormStyleInputComponent;
  let fixture: ComponentFixture<FormStyleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStyleInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStyleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
