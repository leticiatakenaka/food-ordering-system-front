import { Component } from '@angular/core';
import { Order } from './components/order/order';

@Component({
  selector: 'app-root',
  imports: [Order],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {
  title = 'food-ordering-system';
}
