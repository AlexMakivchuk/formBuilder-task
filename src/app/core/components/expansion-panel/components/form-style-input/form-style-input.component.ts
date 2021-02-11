import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { BORDER_STYLES, FONT_WEIGHT } from 'src/app/shared/constants/element-constants';

@Component({
  selector: 'app-form-style-input',
  templateUrl: './form-style-input.component.html',
  styleUrls: [ './form-style-input.component.scss' ]
})
export class FormStyleInputComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() element: NameValueInterface;
  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<string>();
  borderStyles = [ ...BORDER_STYLES ];
  selected: string;
  fontWeight = [ ...FONT_WEIGHT ];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.selected = this.borderStyles[0];
  }

  onSubmit(): void {
    this.submit.emit(this.element.id);
  }

  ngOnDestroy(): void {
  }

}
