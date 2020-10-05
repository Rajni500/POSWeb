import { Category } from './category';

export class Product {
  constructor(
    Id: number,
    Title: string,
    UnitPrice: number,
    AvailableQuantity: number,
    ImageName: string,
    CategoryId: number,
    Category: Category,
  ) {}
}
