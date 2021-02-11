import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DragNDropComponent } from 'src/app/core/components/drag-n-drop/drag-n-drop.component';
import { UnauthorizedGuard } from 'src/app/shared/guards/unauthorized.guard';

const routes: Routes = [
  { path: 'form-builder', component: DragNDropComponent, canActivate: [ UnauthorizedGuard ] },
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
export class CoreRoutingModule {
}
