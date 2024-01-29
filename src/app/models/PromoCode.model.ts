export class PromoCode {
  id: number;
  code: string;
  discount: number;
  expirationDate: Date;
  active: boolean;
  constructor(id: number, code: string, discount: number, expirationDate: Date, isActive: boolean) {
    this.id = id;
    this.code = code;
    this.discount = discount;
    this.expirationDate = expirationDate;
    this.active = isActive;
  }

}
