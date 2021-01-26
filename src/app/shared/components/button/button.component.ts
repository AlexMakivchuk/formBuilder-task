import {Component, Input, OnInit} from '@angular/core';
import {NameValueInterface} from '../../models/name-value-interface';

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

}
