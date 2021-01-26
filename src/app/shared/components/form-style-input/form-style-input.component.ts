import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';

@Component({
  selector: 'app-form-style-input',
  templateUrl: './form-style-input.component.html',
  styleUrls: ['./form-style-input.component.scss']
})
export class FormStyleInputComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() element: NameValueInterface;
  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submit.emit(this.element.id);
  }

  ngOnDestroy(): void {
  }

}
