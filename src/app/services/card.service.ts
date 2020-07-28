import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CardTypeModel} from '../models/card-type.model';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {MaskModel} from '../models/mask.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  readonly filterCardsIds = ['3'];
  readonly cardMasks: MaskModel[] = [
    // Visa
    {
      id: '1',
      mask: '0000 0000 0000 0000',
      pattern: /^\d{16}$/,
    },
    // MasterCard
    {
      id: '2',
      mask: '0000 0000 0000 0000',
      pattern: /^\d{16}$/,
    },
    // JCB
    {
      id: '3',
      mask: '0000 0000 0000 0000',
      pattern: /^\d{16}$/,
    },
    // Amex
    {
      id: '4',
      mask: '0000 000000 00000',
      pattern: /^\d{15}$/,
    }
  ];

  constructor(private http: HttpClient) {
  }

  cardTypes(): Observable<CardTypeModel[]> {
    return this.http.get('https://www.mocky.io/v2/5d145fa22f0000ff3ec4f030').pipe(
      map((response: any) => response.cardTypes.map((cardType: CardTypeModel) => plainToClass(CardTypeModel, cardType))),
      // Filter cards
      map((cards: CardTypeModel[]) =>
        cards.filter((card: CardTypeModel) => !this.filterCardsIds.some((filterCardId: string) => filterCardId === card.id))
      )
    );
  }

  submitPayment(data) {
    if (data.paymentShouldSucceed) {
      return this.submitPaymentSuccess(data);
    }

    return this.submitPaymentFailing(data);
  }

  protected submitPaymentSuccess(data): Observable<any> {
    return this.http.post('https://www.mocky.io/v2/5d8de422310000b19d2b517a', data);
  }

  protected submitPaymentFailing(data): Observable<any> {
    return this.http.post('https://www.mocky.io/v2/5d8de441310000a2612b517c', data).pipe(
      catchError((error) => of(error.error))
    );
  }
}
