import { Component, signal } from '@angular/core';
import { TiendaComponent } from './components/tienda/tienda';

@Component({
  imports: [TiendaComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tecnomax');
}