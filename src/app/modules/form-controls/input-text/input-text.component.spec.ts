import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InputTextComponent} from './input-text.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardService} from '../../../services/card.service';
import {HttpClientModule} from '@angular/common/http';
import {MaskModel} from '../../../models/mask.model';
import {plainToClass} from 'class-transformer';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        CardService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
