import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { FONT_WEIGHT } from 'src/app/shared/constants/element-constants';

@Component({
  selector: 'app-form-style-checkbox',
  templateUrl: './form-style-checkbox.component.html',
  styleUrls: [ './form-style-checkbox.component.scss' ]
})
export class FormStyleCheckboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() element: NameValueInterface;
  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<string>();

  fontWeight = [ ...FONT_WEIGHT ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submit.emit(this.element.id);
  }
}
