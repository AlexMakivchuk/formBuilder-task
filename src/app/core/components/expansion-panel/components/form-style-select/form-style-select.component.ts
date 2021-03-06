import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { NameValueInterface, OptionsNameValue } from 'src/app/shared/models/name-value-interface';
import { State } from 'src/app/core/reducers';
import * as actions from 'src/app/core/actions';
import { BORDER_STYLES, FONT_WEIGHT } from 'src/app/shared/constants/element-constants';

@Component({
  selector: 'app-form-style-select',
  templateUrl: './form-style-select.component.html',
  styleUrls: ['./form-style-select.component.scss']
})
export class FormStyleSelectComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() element: NameValueInterface;
  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<string>();
  public formOptions: FormGroup;
  options: OptionsNameValue[];
  formItems: NameValueInterface[];
  borderStyles = [ ...BORDER_STYLES ];
  selected: string;
  fontWeight = [...FONT_WEIGHT];

  constructor( private store: Store<State> ) {
  }

  ngOnInit(): void {
    this.selected = this.element.styles.borderStyle.value;
    this.options = JSON.parse(JSON.stringify(this.element.options));
    this.buildForm();
  }

  onSubmit(): void {
    this.submit.emit(this.element.id);
  }

  public onSubmitOptions(): void {
    const optArray = [];
    Object.keys(this.formOptions.value).forEach(key => {
      optArray.push(this.formOptions.get(key).value);
    });
    this.store.dispatch(actions.updateFormItemById({ payload: { ...this.element, options: optArray }}));
  }

  private buildForm(): void {
    this.formOptions = new FormGroup({
      first: new FormGroup({
          name: new FormControl(this.options[0].name),
          value: new FormControl(this.options[0].value),
        }),
      second: new FormGroup({
        name: new FormControl(this.options[1].name),
        value: new FormControl(this.options[1].value),
      }),
      third: new FormGroup({
        name: new FormControl(this.options[2].name),
        value: new FormControl(this.options[2].value),
      }),
    });
  }

}
