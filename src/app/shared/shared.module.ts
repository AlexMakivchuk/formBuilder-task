import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveComponentModule } from '@ngrx/component';

import { SelectComponent } from 'src/app/shared/components/select/select.component';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';


@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    TextareaComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    ReactiveComponentModule
  ],
  exports: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    TextareaComponent,
    ReactiveComponentModule
  ]

})
export class SharedModule {
}
