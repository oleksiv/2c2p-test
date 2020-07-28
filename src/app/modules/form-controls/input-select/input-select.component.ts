import {Component, Input} from '@angular/core';
import {AbstractFormControlDirective} from '../abstract-form-control.directive';
import {InputSelectOptionModel} from '../../../models/input-select-option.model';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent extends AbstractFormControlDirective {
  @Input() options: InputSelectOptionModel[];
}
