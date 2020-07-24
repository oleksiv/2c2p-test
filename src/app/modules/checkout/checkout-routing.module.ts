import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentComponent} from './payment/payment.component';
import {SummaryComponent} from './summary/summary.component';

const routes: Routes = [
  {path: '', component: PaymentComponent},
  {path: 'summary', component: SummaryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
