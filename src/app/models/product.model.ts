import {Expose} from 'class-transformer';

export class ProductModel {
  title: string;
  date: string;
  description: string;
  price: number;
  currency: string;
  image: string;

  @Expose()
  get convertedPrice() {
    return this.price / 100;
  }
}
