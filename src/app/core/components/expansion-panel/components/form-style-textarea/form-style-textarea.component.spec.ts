import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStyleTextareaComponent } from 'src/app/core/components/expansion-panel/components/form-style-textarea/form-style-textarea.component';

describe('FormStyleTextareaComponent', () => {
  let component: FormStyleTextareaComponent;
  let fixture: ComponentFixture<FormStyleTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStyleTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStyleTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
