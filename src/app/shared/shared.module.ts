import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './components/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormStyleInputComponent } from './components/form-style-input/form-style-input.component';
import { FormStyleButtonComponent } from './components/form-style-button/form-style-button.component';
import { FormStyleSelectComponent } from './components/form-style-select/form-style-select.component';
import { FormStyleCheckboxComponent } from './components/form-style-checkbox/form-style-checkbox.component';
import { FormStyleTextareaComponent } from './components/form-style-textarea/form-style-textarea.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    TextareaComponent,
    ExpansionPanelComponent,
    FormStyleInputComponent,
    FormStyleButtonComponent,
    FormStyleSelectComponent,
    FormStyleCheckboxComponent,
    FormStyleTextareaComponent,
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
  ],
  exports: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    ExpansionPanelComponent,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    DragDropModule,
  ]

})
export class SharedModule { }
