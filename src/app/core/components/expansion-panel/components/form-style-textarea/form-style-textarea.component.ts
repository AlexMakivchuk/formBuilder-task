import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { BORDER_STYLES } from 'src/app/shared/constants/element-constants';

@Component({
  selector: 'app-form-style-textarea',
  templateUrl: './form-style-textarea.component.html',
  styleUrls: ['./form-style-textarea.component.scss']
})
export class FormStyleTextareaComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() element: NameValueInterface;
  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<string>();
  borderStyles = [ ...BORDER_STYLES ];
  selected: string;

  ngOnInit(): void {
    this.selected = this.borderStyles[0];
  }

  onSubmit(): void {
    this.submit.emit(this.element.id);
  }

}
