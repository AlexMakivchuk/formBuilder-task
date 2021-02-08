import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { BUTTON_STYLES, CHECKBOX_STYLES, INPUT_STYLES, SELECT_STYLES, TEXTAREA_STYLES } from 'src/app/shared/constants/element-constants';
import * as actions from 'src/app/core/actions';
import { getFormItems, State } from 'src/app/core/reducers';
import { EElementNames } from 'src/app/shared/enums/e-element-names.enum';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { IStyles } from 'src/app/shared/models/i-styles';


@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  panelOpenState = false;
  @Input() element: NameValueInterface;
  public form: FormGroup;
  styles: IStyles = {};
  formItems: NameValueInterface[];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>
    ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.store.select(getFormItems)
      .pipe(
        first())
      .subscribe(value => {
        this.formItems = JSON.parse(JSON.stringify(value));
      });
    this.initStyles();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      width: [this.element.styles.width?.value, [Validators.required, this.isNumberValidator]],
      height: [this.element.styles.height?.value, [Validators.required, this.isNumberValidator]],
      border: [this.element.styles.border?.value, [Validators.required, this.isNumberValidator]],
      borderStyle: [this.element.styles.borderStyle?.value],
      borderColor: [this.element.styles.borderColor?.value],
      borderRadius: [this.element.styles.borderRadius?.value, [Validators.required, this.isNumberValidator]],
      fontWeight: [this.element.styles.fontWeight?.value, [Validators.required, this.isNumberValidator]],
      fontSize: [this.element.styles.fontSize?.value, [Validators.required, this.isNumberValidator]],
      margin: [this.element.styles.margin?.value, [Validators.required, this.isNumberValidator]],
      padding: [this.element.styles.padding?.value, [Validators.required, this.isNumberValidator]],
      label: [this.element.styles.label?.value],
      placeholder: [this.element.styles.placeholder?.value],
      color: [this.element.styles.color?.value],
    });
  }

  public isNumberValidator = (control: FormControl): object => {
    const condition = typeof parseInt(control.value, 10) === 'number';
    if (!condition) {
      return ({ isNumberValidator: 'the value must be a number' });
    }
    return null;
  }

  public OnSubmit(): void {
    if (this.form.valid) {
      Object.keys(this.form.controls).forEach( (key, index) => {
        const controll = this.form.get(key);
        if (controll.value) {
          this.styles[key].value = this.styles[key]?.value ? controll.value : null;
        }
      });
      this.store.dispatch(actions.updateFormItemById({ payload: { ...this.element, styles: this.styles }}));
    }
  }

  public initStyles(): void {
    switch (this.element.name) {
      case EElementNames.input: this.styles = JSON.parse(JSON.stringify(INPUT_STYLES)); break;
      case EElementNames.button: this.styles = JSON.parse(JSON.stringify(BUTTON_STYLES)); break;
      case EElementNames.checkbox: this.styles = JSON.parse(JSON.stringify(CHECKBOX_STYLES)); break;
      case EElementNames.select: this.styles = JSON.parse(JSON.stringify(SELECT_STYLES)); break;
      case EElementNames.textarea: this.styles = JSON.parse(JSON.stringify(TEXTAREA_STYLES)); break;
    }
  }

}
