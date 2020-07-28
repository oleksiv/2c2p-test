import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import IMask from 'imask';
import {AbstractFormControlDirective} from '../abstract-form-control.directive';
import {distinctUntilChanged, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends AbstractFormControlDirective implements OnInit, OnChanges {
  @ViewChild('input', {static: true}) input: ElementRef;

  masked: any;

  ngOnInit() {
    // Init mask object
    if (this.mask) {
      this.masked = IMask(this.input.nativeElement, {
        mask: this.mask,
      });
      // Initialize input value from control
      this.subscription.add(
        this.control.valueChanges.pipe(
          distinctUntilChanged(),
          startWith(this.control.value as string),
        ).subscribe(value => {
          this.masked.unmaskedValue = value.toString();
          this.input.nativeElement.value = this.masked.value;
          this.changeDetectorRef.detectChanges();
        })
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.masked) {
      // Update masked object
      this.masked.updateOptions({mask: this.mask});
      // Update form control as well
      this.control.patchValue(this.masked.unmaskedValue);
    }
  }

  keyUpEvent(event) {
    if (this.mask) {
      // If mask is used, get it's original value
      this.control.patchValue(this.masked.unmaskedValue);
    } else {
      // Just update form control value
      this.control.patchValue(event.target.value);
    }
  }

  blurEvent(event) {
    this.control.markAsTouched();
  }
}
