import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  BUTTON_STYLES,
  CHECKBOX_STYLES,
  CONST_OPTIONS, GENERAL_STYLES,
  INPUT_STYLES,
  SELECT_STYLES,
  TEXTAREA_STYLES
} from 'src/app/shared/constants/element-constants';
import { getFormItems, getGeneralStyles, State } from 'src/app/core/reducers';
import * as actions from 'src/app/core/actions';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { FormBuilderService } from 'src/app/shared/services/form-builder.service';
import { FormBuilderModel } from 'src/app/shared/models/form-builder.model';
import { EElementNames } from 'src/app/shared/enums/e-element-names.enum';
import { IStyles } from 'src/app/shared/models/i-styles';


@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: [ './drag-n-drop.component.scss' ]
})
export class DragNDropComponent implements OnInit, OnDestroy {

  public ngUndestroy$ = new Subject<any>();
  public builder: FormBuilderModel;
  public formElements: NameValueInterface[];
  public form = new FormGroup({});
  public dragNDropType = 'form';
  public names = EElementNames;
  public disabled = false;
  public generalStyles$: Observable<NameValueInterface>;
  public generalStylesElement: NameValueInterface = { name: 'general styles', type: '', value: '', styles: { ...GENERAL_STYLES } };

  constInitElements: NameValueInterface[] = [
    { name: EElementNames.input, value: 'input', type: '', required: false, styles: { ...INPUT_STYLES } },
    { name: EElementNames.select, value: 'select', type: '', required: false, styles: { ...SELECT_STYLES }, options: [ ...CONST_OPTIONS ] },
    { name: EElementNames.checkbox, value: 'checkbox', type: '', required: false, styles: { ...CHECKBOX_STYLES } },
    { name: EElementNames.button, value: 'button', type: 'basic', styles: { ...BUTTON_STYLES } },
    { name: EElementNames.button, value: 'button', type: 'primary', styles: { ...BUTTON_STYLES } },
    { name: EElementNames.textarea, value: 'textarea', type: '', required: false, styles: { ...TEXTAREA_STYLES } }
  ];
  initElements = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private store: Store<State>,
    private formBuilderService: FormBuilderService,
  ) {
  }

  ngOnInit(): void {
    this.initElements = [ ...this.constInitElements ];
    const id = this.getFormBuilderId();
    if (id) {
      this.formBuilderService.getFormBuilderById(id).subscribe(
        value => {
          if (value) {
            this.store.dispatch(actions.updateFormItem(
              { payload: JSON.parse(JSON.stringify(value.builderArray)) }
            ));
            this.store.dispatch(actions.addGeneralStyles(
              { payload: value.generalStyles ? value.generalStyles : { ...this.generalStylesElement } }
            ));
            this.builder = value;
          }
          this.generalStyles$ = this.getGeneralStylesFromStore();
          this.getFormItemsFromStore();
        });
    }
  }

  getGeneralStylesFromStore(): Observable<NameValueInterface> {
    return this.store.select(getGeneralStyles)
      .pipe(
        takeUntil(this.ngUndestroy$)
      );
  }

  private getFormItemsFromStore(): void {
    this.store.select(getFormItems).pipe(
      takeUntil(this.ngUndestroy$),
      map(elems => {
        this.buildForm(elems);
        this.formElements = [ ...elems ];
        return elems;
      }))
      .subscribe(
        (elements) => {
          elements.forEach(e => {
            if (e.name !== EElementNames.button) {
              if (e.required) {
                this.form.get(e.id).setValidators(e.name !== 'checkbox' ? [ Validators.required ] : [ Validators.requiredTrue ]);
              } else {
                this.form.get(e.id).clearValidators();
              }
            }
          });
        }
      );
  }

  buildForm(controls: NameValueInterface[]): void {
    controls.forEach(el => {
      switch (el.name) {
        case EElementNames.input:
          this.form.addControl(el.id, new FormControl(''));
          break;
        case EElementNames.checkbox:
          this.form.addControl(el.id, new FormControl(false));
          break;
        case EElementNames.textarea:
          this.form.addControl(el.id, new FormControl(''));
          break;
        case EElementNames.select:
          this.form.addControl(el.id, new FormControl(''));
          break;
      }
    });
  }

  drop(event: CdkDragDrop<object[]>): void {
    this.initElements = [ ...this.constInitElements ];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.formElements[event.currentIndex].id = `${this.formElements[event.currentIndex].name}-${Date.now()}`;
    }
    this.store.dispatch(actions.updateFormItem({ payload: JSON.parse(JSON.stringify(this.formElements)) }));
    this.cdr.detectChanges();
  }

  noReturnPredicate(): boolean {
    return false;
  }

  delElement(id: string, index: number): void {
    this.formElements.splice(index, 1);
    Object.keys(this.form.value).forEach(
      key => key !== 'checkbox'
        ? this.form.get(key).setValue('')
        : this.form.get(key).setValue(false)
    );
    this.form.removeControl(id);
    this.store.dispatch(actions.updateFormItem({ payload: JSON.parse(JSON.stringify(this.formElements)) }));
  }

  saveForm(gStyles: NameValueInterface): void {
    if (this.builder) {
      this.builder.builderArray = this.formElements;
      this.builder.generalStyles = gStyles;
      this.formBuilderService.saveFormBuilder(this.builder).subscribe();
    } else {
      const builder: FormBuilderModel = {
        userId: this.getFormBuilderId(),
        builderArray: [ ...this.formElements ],
        generalStyles: this.generalStylesElement
      };
      this.formBuilderService.addFormBuilder(builder).subscribe();
    }
  }

  getFormBuilderId(): number {
    const obj = jwt_decode(localStorage.getItem('token'));
    // @ts-ignore
    return obj ? obj.sub : null;
  }

  ngOnDestroy(): void {
    this.ngUndestroy$.next(null);
    this.ngUndestroy$.complete();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    let str = '';
    Object.keys(this.form.value).forEach(key => {
      str = str + `${key} : ${this.form.get(key).value}\n`;
    });
    alert(str);
  }

  onLogOut(gStyles: NameValueInterface): void {
    this.saveForm(gStyles);
    this.store.dispatch(actions.logOut());
    localStorage.removeItem('token');
    this.router.navigate([ '/login' ]);
  }

  addGeneralStyles(item: NameValueInterface): IStyles {
    const styles = {};
    Object.keys(item.styles).forEach((key, index) => {
      styles[key] = item.styles[key].value + item.styles[key].units;
    });
    return styles;
  }

}
