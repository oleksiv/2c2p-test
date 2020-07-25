import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Self, SimpleChanges, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import IMask from 'imask';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {

  @ViewChild('input', {static: true}) input: ElementRef;

  @Input() type = 'text';
  @Input() mask: any;
  @Input() placeholder: string;
  @Input() inputClass: string;

  disabled: boolean;
  masked: any;

  constructor(
    @Self() public controlDir: NgControl,
  ) {
    this.controlDir.valueAccessor = this;
  }

  onChange(event) {
  }

  onTouched() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.placeholder);
    console.log(this.mask);
    this.input.nativeElement.value = this.controlDir.control.value;

    this.masked = IMask(this.input.nativeElement, {
      mask: this.mask,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.masked) {
      this.masked.updateOptions({mask: this.mask});
      this.onChange(this.masked.unmaskedValue);
    }
  }

  onMaskInput(event) {
    this.onChange(this.masked.unmaskedValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj;
  }

}
