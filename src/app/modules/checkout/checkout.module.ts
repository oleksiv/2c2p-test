import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {PaymentComponent} from './payment/payment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {FormControlsModule} from '../form-controls/form-controls.module';
import { PaymentResultComponent } from './payment-result/payment-result.component';


@NgModule({
  declarations: [CheckoutComponent, PaymentComponent, PaymentResultComponent],
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
