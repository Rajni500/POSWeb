export class User {
  Id: number;
  Title: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  RoleId : Role
}

export enum Role {
  None = 0,
  Admin = 1,
  Customer = 2
}

export class BillItem {
  ProductId: number;
  Quantity: number;
}
