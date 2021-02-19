import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  BUTTON_STYLES,
  CHECKBOX_STYLES,
  GENERAL_STYLES,
  INPUT_STYLES,
  SELECT_STYLES,
  TEXTAREA_STYLES
} from 'src/app/shared/constants/element-constants';
import * as actions from 'src/app/core/actions';
import { State } from 'src/app/core/reducers';
import { EElementNames } from 'src/app/shared/enums/e-element-names.enum';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { IStyles } from 'src/app/shared/models/i-styles';
import { ELEMENT_STYLES } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: [ './expansion-panel.component.scss' ]
})
export class ExpansionPanelComponent implements OnInit {
  panelOpenState: boolean;
  @Input() element: NameValueInterface;
  public form: FormGroup;
  styles: IStyles = {};
  elementNames = EElementNames;
  elementsStyles = ELEMENT_STYLES;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.styles = this.element.styles ? JSON.parse(JSON.stringify(this.element.styles)) : this.initStyles();
    Object.keys(this.styles).forEach(key => {
      this.form.get(key).patchValue(this.styles[key].value);
    });
    this.form.get('required').patchValue(this.element.required ? this.element.required : false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      width: [ '', [ Validators.required, this.isNumberValidator ] ],
      height: [ '', [ Validators.required, this.isNumberValidator ] ],
      border: [ '', [ Validators.required, this.isNumberValidator ] ],
      borderStyle: [ '' ],
      borderColor: [ '' ],
      borderRadius: [ '', [ Validators.required, this.isNumberValidator ] ],
      fontWeight: [ '', [ Validators.required, this.isNumberValidator ] ],
      fontSize: [ '', [ Validators.required, this.isNumberValidator ] ],
      margin: [ '', [ Validators.required, this.isNumberValidator ] ],
      padding: [ '', [ Validators.required, this.isNumberValidator ] ],
      label: [ '' ],
      placeholder: [ '' ],
      color: [ '' ],
      required: []
    });
  }

  public isNumberValidator = (control: FormControl): object => {
    const condition = typeof parseInt(control.value, 10) === 'number';
    return !condition ? { isNumberValidator: 'the value must be a number' } : null;
  }

  public onSubmit(): void {
    Object.keys(this.form.controls).forEach((key, index) => {
      const controll = this.form.get(key);
      if (controll.value && key !== 'required') {
        this.styles[key].value = this.styles[key]?.value ? controll.value : null;
      }
    });
    this.store.dispatch(actions.updateFormItemById({
      payload: { ...this.element, styles: this.styles, required: this.form.get('required').value }
    }));
  }



  public initStyles(): void {
    return this.elementsStyles[this.element.name];
  }

}
