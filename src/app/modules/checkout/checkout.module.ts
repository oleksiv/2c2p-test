import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {PaymentComponent} from './payment/payment.component';
import {SummaryComponent} from './summary/summary.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {FormControlsModule} from '../form-controls/form-controls.module';


@NgModule({
  declarations: [CheckoutComponent, PaymentComponent, SummaryComponent],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        FormControlsModule,
    ]
})
export class CheckoutModule {
}
