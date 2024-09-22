import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'; // Use picture marker
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapView: MapView | any;
  userLocationGraphic: Graphic | any;
  map: Map | any;
  latitude: number = 39.89728881490816;
  longitude: number =-105.02771502187235;

  constructor() {}

  async ngOnInit() {
    this.map = new Map({
      basemap: 'topo-vector' // Default basemap
    });

    this.mapView = new MapView({
      container: 'container',
      map: this.map,
      zoom: 8,
      center: [this.longitude, this.latitude]
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    this.map.add(weatherServiceFL);

    this.addMarkerAtLocation(this.latitude, this.longitude);
  }

  // Function to add a marker at the specified coordinates
  addMarkerAtLocation(lat: number, long: number) {
    const point = new Point({ latitude: lat, longitude: long });

    // Use PictureMarkerSymbol to display a custom image as the marker
    const symbol = new PictureMarkerSymbol({
      url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL of the image
      width: '32px',  // width of the image
      height: '32px', // height of the image
    });

    this.userLocationGraphic = new Graphic({
      geometry: point,
      symbol: symbol
    });

    this.mapView.graphics.add(this.userLocationGraphic); // Add the marker to the map
  }

  // Function to handle basemap change
  onBasemapChange(event: any) {
    const selectedBasemap = event.detail.value;
    this.map.basemap = selectedBasemap; // Change the basemap
  }
}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';
//   private latitude: number | any;
//   private longitude: number | any;

//   public async ngOnInit() {
//     const position = await Geolocation.getCurrentPosition();
//     this.latitude = position.coords.latitude;
//     this.longitude = position.coords.longitude;

//     // this.longitude = 112.73682347811031
//     // this.latitude = -7.2942937585329615

//     const map = new Map({
//       basemap: "topo-vector"
//     });

//     const view = new MapView({
//       container: "container",
//       map: map,
//       zoom: 15,
//       center: [this.longitude, this.latitude]
//     });

//     // Menggunakan PictureMarkerSymbol untuk marker custom
//     const customMarkerSymbol = new PictureMarkerSymbol({
//       url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",  // URL gambar
//       width: "32px",  // Lebar gambar marker
//       height: "32px"  // Tinggi gambar marker
//     });

//     // Membuat objek Point untuk lokasi saat ini
//     const point = new Point({
//       longitude: this.longitude,
//       latitude: this.latitude
//     });

//     // Membuat Graphic untuk marker dengan simbol gambar
//     const pointGraphic = new Graphic({
//       geometry: point,
//       symbol: customMarkerSymbol  // Terapkan simbol gambar
//     });

//     // Tambahkan marker ke view
//     view.graphics.add(pointGraphic);
//   }
