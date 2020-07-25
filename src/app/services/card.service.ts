import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CardTypeModel} from '../models/card-type.model';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  readonly cardMasks = [
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
    return this.http.get('http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030').pipe(
      map((response: any) => response.cardTypes.map((cardType: CardTypeModel) => plainToClass(CardTypeModel, cardType))),
    );
  }

  submitPayment(data) {
    if (data.paymentSucceeds) {
      return this.submitPaymentSuccess(data);
    }

    return this.submitPaymentFailing(data);
  }

  protected submitPaymentSuccess(data): Observable<any> {
    return this.http.post('http://www.mocky.io/v2/5d8de422310000b19d2b517a', data);
  }

  protected submitPaymentFailing(data): Observable<any> {
    return this.http.post('http://www.mocky.io/v2/5d8de441310000a2612b517c', data).pipe(
      catchError((error) => of(error.error))
    );
  }
}
