import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';
import { CONST_OPTIONS } from 'src/app/shared/constants/element-constants';

const MOCK_STYLES = { width: '450px', height: '450px', label: 'input', placeholder: 'placeholder' };

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const mockElement = {
    name: 'mock', value: 'mock', styles: {
      width: { value: '450', units: 'px' },
      height: { value: '450', units: 'px' },
      label: { value: 'input', units: '' },
      placeholder: { value: 'placeholder', units: '' },
    },
    options: CONST_OPTIONS
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create styles for select ngStyle', () => {
    // @ts-ignore
    expect(component.addStyle()).toEqual({});
  });

  it('prop options of component is defined', () => {
    component.ngOnInit();
    expect(component.options).toEqual(mockElement.options);
  });

  it('should create styles for select ngStyle component.type === form', () => {
    component.type = 'form';
    // @ts-ignore
    expect(component.addStyle()).toEqual(MOCK_STYLES);
  });
});
