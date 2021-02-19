import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { StylesService } from 'src/app/shared/services/styles.service';
import { EElementNames } from 'src/app/shared/enums/e-element-names.enum';

const MOCK_STYLES = { width: '450px', height: '450px', label: 'input', placeholder: 'placeholder' };

describe('InputComponent', () => {
  let component;
  let fixture: ComponentFixture<InputComponent>;

  const formGroupDirective = new FormGroupDirective([], []);
  const mockElement = {
    name: 'mock', value: 'mock', styles: {
      width: { value: '450', units: 'px' },
      height: { value: '450', units: 'px' },
      label: { value: 'input', units: '' },
      placeholder: { value: 'placeholder', units: '' },
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        InputComponent
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        },
        StylesService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    component.hasError = false;
    component.disabled = false;
    component.name = EElementNames.input;
    component.submited = false;
    component.value = EElementNames.input;
    component.placeholder = component.element.styles.placeholder.value;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create styles for input ngStyle', () => {
    // @ts-ignore
    expect(component.addStyle()).toEqual({});
  });

  it('should create styles for input ngStyle component.type === form', () => {
    component.type = 'form';
    // @ts-ignore
    expect(component.addStyle()).toEqual(MOCK_STYLES);
  });

  it('#setDisabledState set state to prop disabled', () => {
    component.setDisabledState(true);
    expect(component.disabled).toEqual(true);
    component.setDisabledState(false);
    expect(component.disabled).toEqual(false);
  });
});
