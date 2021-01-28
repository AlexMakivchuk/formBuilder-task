import { Component, Input, OnInit } from '@angular/core';
import { NameValueInterface } from '../../models/name-value-interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BUTTON_STYLES, CHECKBOX_STYLES, INPUT_STYLES, SELECT_STYLES } from '../../constants/element-constants';
import * as actions from '../../../core/actions';
import { Store } from '@ngrx/store';
import { getFormItems, State } from '../../../core/reducers';
import { first } from 'rxjs/operators';
import { EElementNames } from '../../enums/e-element-names.enum';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  panelOpenState = false;
  @Input() element: NameValueInterface;
  public form: FormGroup;
  styles = {};
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
        this.formItems = JSON.parse(JSON.stringify(value.key.formItems));
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
     // fontWeight: [this.element.styles.fontWeight?.value, [Validators.required, this.isNumberValidator]],
     // fontSize: [this.element.styles.fontSize?.value, [Validators.required, this.isNumberValidator]],
      margin: [this.element.styles.margin?.value, [Validators.required, this.isNumberValidator]],
      padding: [this.element.styles.padding?.value, [Validators.required, this.isNumberValidator]],
      label: [this.element.styles.label?.value],
      placeholder: [this.element.styles.placeholder?.value],
      value: [this.element.styles.value?.value],
      checked: [this.element.styles.checked?.value],
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
          this.styles[key].value = controll.value;
        }
      });
      this.formItems.map(elem => elem.id === this.element.id ? elem.styles = {...this.styles} : elem);
      this.store.dispatch(actions.updateFormItem({ payload: JSON.parse(JSON.stringify(this.formItems)) }));
    }

  }

  public initStyles(): void {
    switch (this.element.name) {
      case EElementNames.input: this.styles = JSON.parse(JSON.stringify(INPUT_STYLES)); break;
      case EElementNames.button: this.styles = JSON.parse(JSON.stringify(BUTTON_STYLES)); break;
      case EElementNames.checkbox: this.styles = JSON.parse(JSON.stringify(CHECKBOX_STYLES)); break;
      case EElementNames.select: this.styles = JSON.parse(JSON.stringify(SELECT_STYLES)); break;

    }
  }

}
