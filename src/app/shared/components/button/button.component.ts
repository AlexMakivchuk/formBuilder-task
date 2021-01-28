import { Component, Input, OnInit } from '@angular/core';
import { NameValueInterface } from '../../models/name-value-interface';
import { IStyles } from '../../models/i-styles';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;
  constructor() { }

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

}
