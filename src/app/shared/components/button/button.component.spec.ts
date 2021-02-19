import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { StylesService } from 'src/app/shared/services/styles.service';

const MOCK_STYLES = { width: '450px', height: '450px', label: 'button' };

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const mockElement = {
    name: 'mock', value: 'mock', type: 'basic', styles: {
      width: { value: '450', units: 'px' },
      height: { value: '450', units: 'px' },
      label: { value: 'button', units: '' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      providers: [ StylesService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    component.click = 'emit';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create styles for button ', () => {
    expect(component.addStyle()).toEqual({});
  });

  it('should create styles for button ngStyle type === form', () => {
    component.type = 'form';
    expect(component.addStyle()).toEqual(MOCK_STYLES);
  });

  it('should emit click', () => {
    component.save.subscribe(v => {
      expect(v).toBeUndefined();
    });
    component.saveForm();
  });

});
