import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NameValueInterface, OptionsNameValue } from 'src/app/shared/models/name-value-interface';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { getFormItems, State } from '../../../core/reducers';
import * as actions from '../../../core/actions';
import { BORDER_STYLES } from '../../constants/element-constants';

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
  disableOptionButton = false;
  borderStyles = [ ...BORDER_STYLES ];
  selected: string;

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
    this.optionControls.value.forEach( ( e, i ) => {
      this.options[i].name = e;
    });
    this.store.select(getFormItems)
      .pipe(
        first(),
        map((value) => {
          this.formItems = JSON.parse(JSON.stringify(value.key.formItems));
          this.formItems.map(el => el.id === this.element.id
            ? el.options = [...this.options]
            : el.options );
          this.store.dispatch(actions.updateFormItem({ payload: JSON.parse(JSON.stringify(this.formItems)) }));
        }))
      .subscribe();
  }

  get optionControls(): FormArray {
    return this.formOptions.get('options') as FormArray;
  }

  public addControl(): void {
    this.options.push({ value: `${Date.now()}`, name: `option-${Date.now()}` } );
    this.optionControls.push(new FormControl(`option-${Date.now()}`));
    this.disableOptionButton = this.options.length === 6;
  }

  public delControl(index: number): void {
   // this.options.splice(index, 1);
   // let int = parseInt(val.replace('option-', ''), 10);
    this.optionControls.removeAt(index);
    this.options.splice(index, 1);
  }

  private buildForm(): void {
    this.formOptions = new FormGroup({
      options: new FormArray([...this.options.map(value => new FormControl(value.name))])
    });
  }

}
