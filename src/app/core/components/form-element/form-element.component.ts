import { Component, Input, OnInit } from '@angular/core';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { EElementNames } from 'src/app/shared/enums/e-element-names.enum';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() index: number;
  @Input() disabled: boolean;
  @Input() dragNDropType: string;
  public names = EElementNames;
  constructor() { }

  ngOnInit(): void {
  }

}
