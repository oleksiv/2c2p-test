import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import { InputSelectComponent } from './input-select/input-select.component';



@NgModule({
  declarations: [InputTextComponent, InputSelectComponent],
  exports: [
    InputTextComponent,
    InputSelectComponent
  ],
    imports: [
        CommonModule,
        NgxMaskModule,
        ReactiveFormsModule
    ]
})
export class FormControlsModule { }
