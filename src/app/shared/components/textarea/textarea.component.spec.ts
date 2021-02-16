import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';
import { StylesService } from 'src/app/shared/services/styles.service';

const MOCK_STYLES = { width: '450px', height: '450px', label: 'textarea' };

describe('Textarea component', () => {
  let component;
  let fixture: ComponentFixture<TextareaComponent>;

  const formGroupDirective = new FormGroupDirective([], []);
  const mockElement = {
    name: 'mock', value: 'mock', styles: {
      width: { value: '450', units: 'px' },
      height: { value: '450', units: 'px' },
      label: { value: 'textarea', units: '' }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        TextareaComponent
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        },
        StylesService,
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    component.formControlName = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create styles for textarea ngStyle', () => {
    expect(component.addStyle()).toEqual({});
  });

  it('should create styles for textarea ngStyle type = form ', () => {
    component.type = 'form';
    expect(component.addStyle()).toEqual(MOCK_STYLES);
  });


});
