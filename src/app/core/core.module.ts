import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormElementComponent } from './components/form-element/form-element.component';



@NgModule({
  declarations: [
    DragNDropComponent,
    FormElementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
  ],
  exports: [
    DragDropModule,
    DragNDropComponent,
  ]
})
export class CoreModule { }
