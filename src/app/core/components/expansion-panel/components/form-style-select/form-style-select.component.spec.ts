import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStyleSelectComponent } from 'src/app/core/components/expansion-panel/components/form-style-select/form-style-select.component';

describe('FormStyleSelectComponent', () => {
  let component: FormStyleSelectComponent;
  let fixture: ComponentFixture<FormStyleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStyleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStyleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
