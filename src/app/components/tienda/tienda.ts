import { Component, inject, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';
import { ResenaService } from '../../services/resena';
import { Resena } from '../../interfaces/resena';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [FormField],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css'
})
export class TiendaComponent {
  private resenaService = inject(ResenaService);

  // Categorías requeridas
  categorias = ['Celulares', 'Laptops', 'Accesorios', 'Dispositivos Inteligentes'];

  // Productos Destacados (Carrusel)
  destacados = [
    {
      nombre: 'iPhone 15 Pro Max',
      precio: 5299,
      categoria: 'Celulares',
      imagen: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80'
    },
    {
      nombre: 'MacBook Air M2',
      precio: 4699,
      categoria: 'Laptops',
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'
    },
    {
      nombre: 'Smartwatch Garmin Fenix',
      precio: 2199,
      categoria: 'Dispositivos Inteligentes',
      imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
    }
  ];

  // Catálogo General (Tarjetas con Hover)
  productos = [
    {
      nombre: 'Samsung Galaxy S24 Ultra',
      precio: 4899,
      categoria: 'Celulares',
      imagen: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80'
    },
    {
      nombre: 'Laptop Gamer ASUS ROG',
      precio: 5499,
      categoria: 'Laptops',
      imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80'
    },
    {
      nombre: 'Sony WH-1000XM5 ANC',
      precio: 1299,
      categoria: 'Accesorios',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
    },
    {
      nombre: 'Amazon Echo Dot 5ta Gen',
      precio: 249,
      categoria: 'Dispositivos Inteligentes',
      imagen: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80'
    }
  ];

  // Ofertas vigentes
  ofertas = [
    {
      titulo: 'Semana Gamer',
      descuento: '25% DSCTO',
      detalle: 'En laptops seleccionadas y tarjetas gráficas.'
    },
    {
      titulo: 'Renueva tu Smartphone',
      descuento: 'Hasta S/ 500 de bono',
      detalle: 'Dejando tu equipo actual en parte de pago.'
    }
  ];

  // Modelo con Signal
  resenaModelo = signal<Resena>({
    cliente: '',
    producto: '',
    comentario: '',
    calificacion: 1
  });

  // Esquema reactivo con Signals
  resenaFormulario = form(this.resenaModelo, (esquema) => {
    required(esquema.cliente, { message: 'El nombre del cliente es obligatorio' });
    required(esquema.producto, { message: 'Debe indicar el producto a calificar' });
    required(esquema.comentario, { message: 'El comentario no puede estar vacío' });
    min(esquema.calificacion, 1, { message: 'La calificación mínima es 1 estrella' });
  });

  listaResenas: Resena[] = [];

  constructor() {
    this.mostrarResenas();
  }

  guardarResena(evento: Event) {
    evento.preventDefault();
    const nuevaResena: Resena = {
      cliente: this.resenaModelo().cliente,
      producto: this.resenaModelo().producto,
      comentario: this.resenaModelo().comentario,
      calificacion: Number(this.resenaModelo().calificacion)
    };

    this.resenaService.guardar(nuevaResena);

    Swal.fire({
      title: '¡Reseña Registrada!',
      text: 'Gracias por valorar nuestros productos en TecnoMax.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    this.limpiar();
    this.mostrarResenas();
  }

  mostrarResenas() {
    this.listaResenas = this.resenaService.mostrar();
  }

  limpiar() {
    this.resenaModelo.set({
      cliente: '',
      producto: '',
      comentario: '',
      calificacion: 1
    });
  }
}