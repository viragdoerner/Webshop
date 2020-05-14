import {Order} from './order';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  orders: Order[];
}
