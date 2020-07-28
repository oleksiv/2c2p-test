import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentResultComponent} from './payment-result.component';
import {plainToClass} from 'class-transformer';
import {PaymentResponseModel} from '../../../models/payment-response.model';

describe('PaymentResultComponent', () => {
  let component: PaymentResultComponent;
  let fixture: ComponentFixture<PaymentResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentResultComponent);
    component = fixture.componentInstance;
    component.paymentStatusResponse = plainToClass(PaymentResponseModel, {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
