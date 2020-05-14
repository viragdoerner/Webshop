import {Item} from './item';

export class Order {
  id: number;
  date: string;
  sum: number;
  status: string;
  username: string;
  items: Item[];

}
