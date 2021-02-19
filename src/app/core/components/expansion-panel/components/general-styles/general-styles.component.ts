import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BORDER_STYLES, FONT_WEIGHT } from 'src/app/shared/constants/element-constants';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import * as actions from 'src/app/core/actions';
import { IStyles } from 'src/app/shared/models/i-styles';
import { getGeneralStyles } from 'src/app/core/reducers';

@Component({
  selector: 'app-general-styles',
  templateUrl: './general-styles.component.html',
  styleUrls: [ './general-styles.component.scss' ]
})
export class GeneralStylesComponent implements OnInit, OnDestroy {
  element: NameValueInterface;
  public form: FormGroup;
  public borderStyles = [ ...BORDER_STYLES ];
  public selected: string;
  public fontWeight = [ ...FONT_WEIGHT ];
  public ngUnsubscribe$ = new Subject();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.store.select(getGeneralStyles)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        tap(item => {
          this.element = JSON.parse(JSON.stringify(item));
          Object.keys(this.form.value).forEach(key => {
            this.form.get(key).patchValue(item ? item.styles[key].value : '');
          });
        })
      ).subscribe();
  }

  buildForm(): FormGroup {
    return new FormGroup({
      width: new FormControl('', [ Validators.required, this.isNumberValidator ]),
      height: new FormControl('', [ Validators.required, this.isNumberValidator ]),
      border: new FormControl('', [ Validators.required, this.isNumberValidator ]),
      borderStyle: new FormControl('', [ Validators.required ]),
      borderColor: new FormControl('', [ Validators.required ]),
      borderRadius: new FormControl('', [ Validators.required, this.isNumberValidator ]),
      margin: new FormControl('', [ Validators.required, this.isNumberValidator ]),
      padding: new FormControl('', [ Validators.required, this.isNumberValidator ])
    });
  }

  public onSubmit(): void {
    const generalStyles: IStyles = { ...this.element.styles };
    Object.keys(this.form.value).forEach(key => {
      generalStyles[key].value = this.form.get(key).value;
    });
    this.store.dispatch(actions.addGeneralStyles({
      payload: {
        ...this.element,
        styles: generalStyles
      }
    }));
  }

  public isNumberValidator = (control: FormControl): object => {
    const condition = typeof parseInt(control.value, 10) === 'number';
    return !condition ? { isNumberValidator: 'the value must be a number' } : null;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
