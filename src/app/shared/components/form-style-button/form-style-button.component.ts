import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NameValueInterface} from '../../models/name-value-interface';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form);
    this.submit.emit(this.element.id);
  }
}
