import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentComponent} from './payment.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CardService} from '../../../services/card.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChangeDetectorRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {ProductModel} from '../../../models/product.model';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        CardService,
        FormBuilder,
        ChangeDetectorRef,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initially valid form', () => {
    expect(component.form.valid).toBeTrue();
  });

  it('should be have valid product', () => {
    expect(component.product instanceof ProductModel).toBeTrue();
  });
});
