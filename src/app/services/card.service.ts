import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardTypeModel} from '../models/card-type.model';
import {map} from 'rxjs/operators';
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
      pattern: '^\\d{16}$',
    },
    // MasterCard
    {
      id: '2',
      mask: '0000 0000 0000 0000',
      pattern: '^\\d{16}$',
    },
    // JCB
    {
      id: '3',
      mask: '0000 0000 0000 0000',
      pattern: '^\\d{16}$',
    },
    // Amex
    {
      id: '4',
      mask: '0000 000000 00000',
      pattern: '^\\d{15}$',
    }
  ];

  constructor(private http: HttpClient) {
  }

  cardTypes(): Observable<CardTypeModel[]> {
    return this.http.get('http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030').pipe(
      map((response: any) => response.cardTypes.map((cardType: CardTypeModel) => plainToClass(CardTypeModel, cardType))),
      // map((cardTypes: CardTypeModel[]) => cardTypes.map((cardType: CardTypeModel) => {
      //   return {...cardType, mask: this.cardMasks.find((mask) => mask.id === cardType.id)};
      // }))
    );
  }

}
