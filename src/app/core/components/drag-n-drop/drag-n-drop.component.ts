import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { getFormItems, State } from '../../reducers';
import * as actions from '../../actions';
import { NameValueInterface } from '../../../shared/models/name-value-interface';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {
  BUTTON_STYLES,
  CHECKBOX_STYLES,
  CONST_OPTIONS,
  INPUT_STYLES,
  SELECT_STYLES
  } from '../../../shared/constants/element-constants';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit, OnDestroy, AfterViewInit {

  public ngUndestroy$ = new Subject<any>();

  public formElements: NameValueInterface[];

  constInitElements: NameValueInterface[] = [
    { name: 'input', value: 'input', type: '', styles: {...INPUT_STYLES} },
    { name: 'select', value: 'select', type: '', styles: {...SELECT_STYLES}, options: [...CONST_OPTIONS]},
    { name: 'checkbox', value: 'checkbox', type: '', styles: {...CHECKBOX_STYLES} },
    { name: 'button', value: 'button', type: 'basic', styles: {...BUTTON_STYLES} },
    { name: 'button', value: 'button', type: 'primary', styles: {...BUTTON_STYLES} }
  ];
  initElements = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<State>
  ) {
  }

  ngOnInit(): void {
    this.initElements = [ ...this.constInitElements ];
    this.store.select(getFormItems).pipe(
      takeUntil(this.ngUndestroy$),
      map( v => v.key.formItems)
    ).subscribe( value => this.formElements = [ ...value ]);
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

  ngOnDestroy(): void {
    localStorage.clear();
    this.ngUndestroy$.next(null);
    this.ngUndestroy$.complete();
  }

}
