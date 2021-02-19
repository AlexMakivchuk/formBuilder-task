import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { StylesService } from 'src/app/shared/services/styles.service';
import { EButtonTypes } from 'src/app/shared/enums/e-button-types.enum';

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
  eButtonTypes = EButtonTypes;

  constructor(private stylesService: StylesService) { }

  ngOnInit(): void { }

  addStyle(): object {
    if (this.type === 'form') {
      return this.stylesService.createStyleObject(this.element.styles);
    }
    return {};
  }

  saveForm(): void {
    this.save.emit();
  }

}
