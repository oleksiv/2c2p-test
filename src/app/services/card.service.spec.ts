import {fakeAsync, TestBed} from '@angular/core/testing';

import {CardService} from './card.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CardTypeModel} from '../models/card-type.model';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        HttpClient,
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
