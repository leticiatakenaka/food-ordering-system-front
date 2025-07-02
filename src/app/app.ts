import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Order } from './components/order/order';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Order],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {
  title = 'food-ordering-system';
}
