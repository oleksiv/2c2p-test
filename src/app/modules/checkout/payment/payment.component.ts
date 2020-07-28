import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {CardTypeModel} from '../../../models/card-type.model';
import {CardService} from '../../../services/card.service';
import {delay, filter, map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {ProductModel} from '../../../models/product.model';
import {plainToClass} from 'class-transformer';
import {MaskModel} from '../../../models/mask.model';
import {PaymentResponseModel} from '../../../models/payment-response.model';
import {animate, style, transition, trigger} from '@angular/animations';
import {InputSelectOptionModel} from '../../../models/input-select-option.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'boxAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ],
    ),
    trigger(
      'productAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ],
    )
  ],
})
export class PaymentComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription = new Subscription();
  // Mock the product
  product: ProductModel = plainToClass(ProductModel, {
    title: 'IPhone Pro 11',
    date: '24/07/2020',
    price: 1235655,
    currency: 'USD',
    image: 'https://jabko.ua/image/cache/catalog/files_com/jabko_black/iphone/iphone-11/black/11-black-test-700x700.jpg',
  });
  expiryPattern = '00/00';
  cardHolderNamePattern: RegExp = /^[A-Za-z\s]+$/;
  paymentStatusResponse: PaymentResponseModel;
  paymentProcessing = false;

  cardTypes$: Observable<InputSelectOptionModel[]>;
  cardTypeMask$: Observable<MaskModel>;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    // Init the form
    this.form = this.fb.group({
      cardType: this.fb.control('1', [Validators.required]),
      cardNumber: this.fb.control('1111111111111111', [Validators.required]),
      expiry: this.fb.control('1122', [Validators.required, this.expiryDateValidator()]),
      // expiryMonth is a hidden field and is not supposed to be validated
      expiryMonth: this.fb.control(null),
      // expiryYear is a hidden field and is not supposed to be validated
      expiryYear: this.fb.control(null),
      cardholderName: this.fb.control('Sviatoslav Oleksiv', [
        Validators.required,
        Validators.max(50),
        Validators.pattern(this.cardHolderNamePattern)
      ]),
      email: this.fb.control(null, [Validators.email]),
      paymentShouldSucceed: this.fb.control('1'),
    });

    // Fetch card types as observable
    this.cardTypes$ = this.cardService.cardTypes().pipe(
      map((cardTypes: CardTypeModel[]) => cardTypes.map((cardType) => {
        return {
          value: cardType.id,
          title: cardType.value,
        };
      }))
    );

    this.cardTypeMask$ = this.cardType.valueChanges.pipe(
      startWith(this.cardType.value as string),
      filter((cardType: any) => !!cardType),
      map((cardType: string) => this.cardService.cardMasks.find(cardMask => cardMask.id === cardType)),
    );

    this.subscription.add(
      this.cardType.valueChanges.subscribe(() => {
        if (this.cardType.valid) {
          this.cardNumber.enable();
        } else {
          this.cardNumber.disable();
        }
      })
    );

    // Set pattern for card number when card type is changed
    this.subscription.add(
      this.cardTypeMask$.subscribe((mask) => {
        this.cardNumber.setValidators([Validators.required, Validators.pattern(mask.pattern)]);
      })
    );

    this.subscription.add(
      this.expiry.valueChanges.pipe(
        startWith(this.expiry.value as string),
        // We populate expiryMonth and expiryYear only if expiry is valid
        filter(() => this.expiry.valid),
      ).subscribe((expiry: string) => {
        const date = moment(expiry, 'MMYY');
        this.expiryMonth.patchValue(date.format('MM'));
        this.expiryYear.patchValue(date.format('YYYY'));

        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm() {
    this.paymentProcessing = true;
    this.subscription.add(
      this.cardService.submitPayment(this.form.value).pipe(
        // Simulate server delay of 2 seconds
        delay(2000)
      ).subscribe((result: PaymentResponseModel) => {
        this.paymentStatusResponse = result;
        this.paymentProcessing = false;
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  private expiryDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (!control.value) {
        return;
      }

      // Dont validate if control does not have 4 digits
      if (control.value.length < 4) {
        return {expiryDateInvalid: 'Expiration date format should be XX/XX'};
      }

      if (!moment(control.value, 'MMYY').isValid()) {
        return {expiryDateInvalid: 'Expiration date is invalid.'};
      }

      return moment(control.value, 'MMYY').isSameOrAfter(moment()) ? null : {expiryDateInvalid: 'Your card\'s expiration year is in the past.'};
    };
  }

  get cardType() {
    return this.form.get('cardType') as FormControl;
  }

  get cardNumber() {
    return this.form.get('cardNumber') as FormControl;
  }

  get cardHolderName() {
    return this.form.get('cardholderName') as FormControl;
  }

  get expiry() {
    return this.form.get('expiry') as FormControl;
  }

  get expiryMonth() {
    return this.form.get('expiryMonth') as FormControl;
  }

  get expiryYear() {
    return this.form.get('expiryYear') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
}
