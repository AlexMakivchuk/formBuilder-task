import { Component, Input, OnInit } from '@angular/core';
import { NameValueInterface } from '../../models/name-value-interface';
import {IStyles} from '../../models/i-styles';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;
  checked = true;
  constructor() { }

  ngOnInit(): void {
  }

  change(): void {
    this.checked = !this.checked;
    console.log(this.checked);
  }

}
