import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DragNDropComponent } from 'src/app/core/components/drag-n-drop/drag-n-drop.component';
import { FormElementComponent } from 'src/app/core/components/form-element/form-element.component';
import { CoreRoutingModule } from 'src/app/core/core-routing.module';
import { FormStyleInputComponent } from 'src/app/core/components/expansion-panel/components/form-style-input/form-style-input.component';
import { FormStyleButtonComponent } from 'src/app/core/components/expansion-panel/components/form-style-button/form-style-button.component';
import { FormStyleSelectComponent } from 'src/app/core/components/expansion-panel/components/form-style-select/form-style-select.component';
import { FormStyleCheckboxComponent } from 'src/app/core/components/expansion-panel/components/form-style-checkbox/form-style-checkbox.component';
import { FormStyleTextareaComponent } from 'src/app/core/components/expansion-panel/components/form-style-textarea/form-style-textarea.component';
import { ExpansionPanelComponent } from 'src/app/core/components/expansion-panel/expansion-panel.component';
import { GeneralStylesComponent } from './components/expansion-panel/components/general-styles/general-styles.component';



@NgModule({
  declarations: [
    DragNDropComponent,
    FormElementComponent,
    FormStyleInputComponent,
    FormStyleButtonComponent,
    FormStyleSelectComponent,
    FormStyleCheckboxComponent,
    FormStyleTextareaComponent,
    ExpansionPanelComponent,
    GeneralStylesComponent,

  ],
    imports: [
      CommonModule,
      SharedModule,
      CoreRoutingModule,
    ],
  exports: [
    DragNDropComponent,
  ]
})
export class CoreModule { }
