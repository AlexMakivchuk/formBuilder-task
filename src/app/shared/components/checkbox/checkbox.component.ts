import {Component, Input, OnInit} from '@angular/core';
import {NameValueInterface} from '../../models/name-value-interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }

}
