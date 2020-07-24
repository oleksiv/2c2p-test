import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {CardTypeModel} from '../../../models/card-type.model';
import {CardService} from '../../../services/card.service';
import {filter, map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {ProductModel} from '../../../models/product.model';
import {plainToClass} from 'class-transformer';
import {MaskModel} from '../../../models/mask.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription = new Subscription();
  product: ProductModel = plainToClass(ProductModel, {
    title: 'IPhone Pro 11',
    date: '24/07/2020',
    price: 1235655,
    currency: 'USD',
    image: 'https://jabko.ua/image/cache/catalog/files_com/jabko_black/iphone/iphone-11/black/11-black-test-700x700.jpg',
  });

  cardTypes$: Observable<CardTypeModel[]>;
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
      cardType: this.fb.control(null, [Validators.required]),
      cardNumber: this.fb.control({value: null, disabled: true}, [Validators.required]),
      expiry: this.fb.control(null, [Validators.required, Validators.minLength(4), this.expiryDateValidator()]),
      // expiryMonth is a hidden field and is not supposed to be validated
      expiryMonth: this.fb.control(null),
      // expiryYear is a hidden field and is not supposed to be validated
      expiryYear: this.fb.control(null),
      cardholderName: this.fb.control(null, [Validators.required, Validators.max(50), Validators.pattern('^[A-Za-z\\s]+$')]),
      email: this.fb.control(null, [Validators.email])
    });

    // Fetch card types as observable
    this.cardTypes$ = this.cardService.cardTypes();

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

  expiryDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Dont validate if control is empty
      if (!control.value) {
        return null;
      }

      // Dont validate if control does not have 4 digits
      if (control.value.length < 4) {
        return null;
      }

      return moment(control.value, 'MMYY').isSameOrAfter(moment()) ? null : {expiryDateInvalid: control.value};
    };
  }

  get cardType() {
    return this.form.get('cardType');
  }

  get cardNumber() {
    return this.form.get('cardNumber');
  }

  get expiry() {
    return this.form.get('expiry');
  }

  get expiryMonth() {
    return this.form.get('expiryMonth');
  }

  get expiryYear() {
    return this.form.get('expiryYear');
  }

  get cardholderName() {
    return this.form.get('cardholderName');
  }

  get email() {
    return this.form.get('email');
  }
}
