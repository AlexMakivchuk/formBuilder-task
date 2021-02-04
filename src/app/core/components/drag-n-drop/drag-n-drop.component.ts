import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem
  } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
    BUTTON_STYLES,
    CHECKBOX_STYLES,
    CONST_OPTIONS,
    INPUT_STYLES,
    SELECT_STYLES,
    TEXTAREA_STYLES
  } from 'src/app/shared/constants/element-constants';
import { getFormItems, State } from 'src/app/core/reducers';
import * as actions from 'src/app/core/actions';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { FormBuilderService } from 'src/app/shared/services/form-builder.service';
import { FormBuilderModel } from 'src/app/shared/models/form-builder.model';
import { EElementNames } from 'src/app/shared/enums/e-element-names.enum';


@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit, OnDestroy, AfterViewInit {

  public ngUndestroy$ = new Subject<any>();
  public builder: FormBuilderModel;
  public formElements: NameValueInterface[];
  public form = new FormGroup({});
  public dragNDropType = 'form';
  public names = EElementNames;
  public disabled = false;

  constInitElements: NameValueInterface[] = [
    { name: EElementNames.input, value: 'input', type: '', styles: {...INPUT_STYLES} },
    { name: EElementNames.select, value: 'select', type: '', styles: {...SELECT_STYLES}, options: [...CONST_OPTIONS]},
    { name: EElementNames.checkbox, value: 'checkbox', type: '', styles: {...CHECKBOX_STYLES} },
    { name: EElementNames.button, value: 'button', type: 'basic', styles: {...BUTTON_STYLES} },
    { name: EElementNames.button, value: 'button', type: 'primary', styles: {...BUTTON_STYLES} },
    { name: EElementNames.textarea, value: 'textarea', type: '', styles: {...TEXTAREA_STYLES} }
  ];
  initElements = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private store: Store<State>,
    private formBuilderService: FormBuilderService,
  ) { }

  ngOnInit(): void {
    this.initElements = [ ...this.constInitElements ];
    const id = this.getFormBuilderId();
    if (id) {
      this.formBuilderService.getFormBuilderById(id)
        .pipe(first()).subscribe(value => {
          if (value) {
            this.store.dispatch(actions.updateFormItem(
              { payload: JSON.parse(JSON.stringify(value.builderArray)) }
              ));
            this.builder = value;
          }
          this.store.select(getFormItems).pipe(
            takeUntil(this.ngUndestroy$))
            .subscribe( ( elements ) => {
              this.formElements = [ ...elements ];
              this.buildForm(this.formElements);
            });
      } );
    }
  }

  buildForm(controls: NameValueInterface[]): void {
    controls.forEach(el => {
      switch (el.name) {
        case EElementNames.input:
          this.form.addControl(el.id, new FormControl('', [Validators.required]));
          break;
        case EElementNames.checkbox:
          this.form.addControl(el.id, new FormControl(false, [Validators.requiredTrue]));
          break;
        case EElementNames.textarea:
          this.form.addControl(el.id, new FormControl('', [Validators.required]));
          break;
        case EElementNames.select:
          this.form.addControl(el.id, new FormControl(el.options[0].value, [Validators.required]));
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
      this.formElements[event.currentIndex].id = `${ this.formElements[event.currentIndex].name }-${ Date.now() }`;
    }
    this.store.dispatch(actions.updateFormItem({ payload: JSON.parse(JSON.stringify(this.formElements)) }));
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
  }

  noReturnPredicate(): boolean {
    return false;
  }

  delElement(index: number): void {
    this.formElements.splice(index, 1);
    this.store.dispatch(actions.updateFormItem({ payload: JSON.parse(JSON.stringify(this.formElements)) }));
  }

  saveForm(): void {
    if ( this.builder ) {
      this.builder.builderArray = this.formElements;
      this.formBuilderService.saveFormBuilder(this.builder).subscribe();
    } else {
      const builder: FormBuilderModel = {
        userId: this.getFormBuilderId(),
        builderArray: [...this.formElements]
      };
      this.formBuilderService.addFormBuilder(builder).subscribe();
    }
  }

  getFormBuilderId(): number{
    const obj = jwt_decode(localStorage.getItem('token'));
    // @ts-ignore
    return obj ? obj.sub : null ;
  }

  ngOnDestroy(): void {
    this.saveForm();
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

  onLogOut(): void {
    this.store.dispatch(actions.logOut());
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
