import {Component, Input, OnInit} from '@angular/core';
import {PaymentResponseModel} from '../../../models/payment-response.model';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {
  @Input() paymentStatusResponse: PaymentResponseModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
