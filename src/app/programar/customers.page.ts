// customers.page.ts
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ToastController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service'; // Importa el servicio compartido

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  mapa: Mapboxgl.Map;
  direccion: string = '';
  hora: string = '';
  costo: number;

  constructor(private toastController: ToastController, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.5335659, -33.0335445],
      zoom: 17.21,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      mapboxgl: Mapboxgl,
      marker: false,
    });

    this.mapa.addControl(geocoder);

    geocoder.on('result', (event) => {
      const coordinates = event.result.geometry.coordinates;
      this.mapa.setCenter(coordinates);
      this.direccion = '';
    });
  }

  async programarServicio() {
    // Logica para guardar el servicio programado

    // Agrega el viaje programado al servicio compartido
    this.sharedDataService.agregarViajeProgramado({ direccion: this.direccion, hora: this.hora, costo: this.costo });

    await this.mostrarMensaje('¡Viaje programado!');
    this.limpiarVariables();
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      cssClass: 'my-custom-class',
    });

    toast.present();
  }

  limpiarVariables() {
    this.direccion = '';
    this.hora = '';
    this.costo = null;
  }

  ionSlideDidChange(event) {
    console.log(event);
  }

  buscarDireccion(event: CustomEvent) {
    const searchTerm = event.detail.value;
    if (searchTerm) {
      // Realiza la búsqueda geográfica con el término ingresado
      // Puedes utilizar un geocodificador aquí y también actualizar el mapa si lo deseas.
    }
  }
}
