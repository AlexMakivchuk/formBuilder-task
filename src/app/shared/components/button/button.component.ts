import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { IStyles } from 'src/app/shared/models/i-styles';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ]
})
export class ButtonComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() click: string;
  @Input() buttonType: string;
  @Output() save = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  addStyle(): IStyles {
    const styles = {};
    if (this.type === 'form') {
      Object.keys(this.element.styles).forEach((key, index) => {
        styles[key] = this.element.styles[key].value + this.element.styles[key].units;
      });
      return styles;
    }
  }

  saveForm(): void {
    this.save.emit();
  }

}
