import {ChangeDetectorRef, Directive, Injectable, Input, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive()
export class AbstractFormControlDirective implements OnDestroy {
  @Input() control: FormControl;

  @Input() type = 'text';
  @Input() mask: any;
  @Input() placeholder: string;
  @Input() inputClass: string;

  subscription = new Subscription();

  constructor(public changeDetectorRef: ChangeDetectorRef) {
  }

  private ERROR_MESSAGES = {
    required: () => 'This field is required',
    pattern: () => 'Pattern is not valid',
    email: () => 'Invalid email address',
    expiryDateInvalid: (error) => error,
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get listOfErrors(): string[] {
    return this.control.errors ? Object.keys(this.control.errors).map((key) => {
      return this.ERROR_MESSAGES[key](this.control.getError(key));
    }) : [];
  }
}

