// home.page.ts
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { SharedDataService } from '../shared-data.service'; // Importa el servicio compartido

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mapa: Mapboxgl.Map;
  direccion: string = '';

  constructor(private sharedDataService: SharedDataService) {}

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

    // Suscríbete a los cambios en los viajes programados
    this.sharedDataService.viajesProgramados$.subscribe((viajes) => {
      // Maneja los cambios, puedes actualizar la interfaz de usuario según sea necesario
      console.log('Viajes programados:', viajes);
    });
  }

  buscarDireccion(event: CustomEvent) {
    const searchTerm = event.detail.value;
    if (searchTerm) {
      // Realiza la búsqueda geográfica con el término ingresado
      // Puedes utilizar un geocodificador aquí y también actualizar el mapa si lo deseas.
    }
  }
}
