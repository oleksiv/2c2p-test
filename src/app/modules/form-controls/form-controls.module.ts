import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import {NgxMaskModule} from 'ngx-mask';



@NgModule({
  declarations: [InputTextComponent],
  exports: [
    InputTextComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule
  ]
})
export class FormControlsModule { }
