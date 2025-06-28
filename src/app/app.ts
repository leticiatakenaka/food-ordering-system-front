import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderComponent } from './order/order';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'food-ordering-system';
}
