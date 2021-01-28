import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';
import { RouterModule, Routes } from '@angular/router';
import {UnathorizedGuard} from '../shared/guards/unathorized.guard';

const routes: Routes = [
  { path: 'form-builder', component: DragNDropComponent, canActivate: [UnathorizedGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class CoreRoutingModule { }
