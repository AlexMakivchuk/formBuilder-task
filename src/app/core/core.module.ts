import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';
import { FormElementComponent } from './components/form-element/form-element.component';
import {CoreRoutingModule} from './core-routing.module';



@NgModule({
  declarations: [
    DragNDropComponent,
    FormElementComponent
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
