import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NameValueInterface} from 'src/app/shared/models/name-value-interface';
import { BORDER_STYLES } from 'src/app/shared/constants/element-constants';

@Component({
  selector: 'app-form-style-button',
  templateUrl: './form-style-button.component.html',
  styleUrls: ['./form-style-button.component.scss']
})
export class FormStyleButtonComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() element: NameValueInterface;
  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<string>();
  borderStyles = [ ...BORDER_STYLES ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submit.emit(this.element.id);
  }
}
