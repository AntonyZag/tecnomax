import { Injectable } from '@angular/core';
import { Resena } from '../interfaces/resena';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private listaResenas: Resena[] = [
    {
      cliente: 'Carlos Mendoza',
      producto: 'Laptop Gamer ASUS ROG',
      comentario: 'Excelente fluidez gráfica y refrigeración.',
      calificacion: 5
    },
    {
      cliente: 'Mariana Flores',
      producto: 'Samsung Galaxy S24 Ultra',
      comentario: 'Batería duradera y fotos nítidas con zoom.',
      calificacion: 5
    }
  ];

  guardar(resena: Resena) {
    this.listaResenas.push(resena);
  }

  mostrar() {
    return this.listaResenas;
  }
}