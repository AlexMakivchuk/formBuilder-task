import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';
import { StylesService } from 'src/app/shared/services/styles.service';

const MOCK_STYLES = { width: '450px', height: '450px', label: 'checkbox' };

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  const formGroupDirective = new FormGroupDirective([], []);
  const mockElement = {
    name: 'mock', value: 'mock', styles: {
      width: { value: '450', units: 'px' },
      height: { value: '450', units: 'px' },
      label: { value: 'checkbox', units: '' },
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      imports: [
        FormsModule, ReactiveFormsModule
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
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    component.disabled = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create styles for checkbox ngStyle', () => {
    expect(component.addStyle()).toEqual({});
  });

  it('should create styles for checkbox ngStyle type = form', () => {
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
