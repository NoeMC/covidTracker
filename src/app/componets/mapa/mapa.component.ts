import { Component, AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import { } from 'googlemaps';
import {FormControl} from '@angular/forms';
import {startWith, switchMap} from 'rxjs/operators';
import { GeoDataService } from '../../servicios/geo-data.service';
import { RestcovidService } from '../../servicios/restcovid.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements AfterViewInit, OnInit {
  colornb = '#0C8DEC';
  npg = 2;
  control = new FormControl();
  filteredStreets: any[] = [];

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  lat = 19.0433400;
  lng = -98.2019300;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 14,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

  arreglociudades: any[] = [];
  arrayCircles: any[] = [];
  markersArray: any[] = [];
  arrayLines: any[] = [];
  miCiudadHistorial: any;
  miCiudadGeneral: any;
  defaultHistorial: any;
  defaultGeneral: any;
  limitesGrafi = [0, 200, 10];


  constructor(private dataCiti:GeoDataService, private httpCovid: RestcovidService ) {
    const defa = httpCovid.getCityMatch('default');
    defa.then(
      (datos: any) => {
        const {city} = datos;
        this.defaultHistorial = city[0].historial;
        this.defaultGeneral = city[0];
      }
    );
   }

  ngOnInit(): void{ 
    this.control.valueChanges.pipe(
      startWith(''),
      switchMap((value: string) => this.httpCovid.getCityMatch(value))
    )
    .subscribe((users: any) => this._filtrar(users));
  }

  ngAfterViewInit(): void{
    this.mapInitializer();
    this.getLocation();
  }

  otrafunc(): void {
    setTimeout(() => {
      console.log("dentro del get Location",this.arreglociudades);
    },2000);
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }
  _filtrar(valor): void{
    this.filteredStreets = [];
    let {city} = valor;
    for (let index of city){
      this.filteredStreets.push(index.nombre);
    }
  }
  // la mayoria de funciones que dependan de la ubicacion
  //deben ir dentro del getLocation
   getLocation(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.buildMapa(position.coords.latitude, position.coords.longitude);
        },
        () => {
          this.buildMapa(this.lat, this.lng);
        }
      );
    }
  }

  drawCasesAround(){
    let nCiudades =this.dataCiti.getNCities(`${this.lat}`, `${this.lng}` , 19);
    nCiudades.subscribe(
       (datos: any) => {
        let {data} = datos;
        let miCiudad = data[0];
        miCiudad = this.dataCiti.getCity(miCiudad.city);
        miCiudad.then(
          (info:any) => {
            let {city} = info;
            if (city.length === 0){
              this.miCiudadHistorial = this.defaultHistorial;
              this.miCiudadGeneral = this.defaultGeneral;
            }else{
              if (city[0].historial.length === 0){
                this.miCiudadHistorial = this.defaultHistorial;
                this.miCiudadGeneral = this.defaultGeneral;
              }else{
              this.miCiudadHistorial = city[0].historial;
              this.miCiudadGeneral = city[0];
              }
            }
          }
        );
        for (let ct of data){
          let ciudad = this.dataCiti.getCity(ct.city);
          ciudad.then(
            (info: any) =>{
              let {city} = info;
              if (city.length === 0){
                this.dibujaContagios(ct, (Math.random() * (150 - 10) + 10));
              }else{
                const {historial} = city[0];
                this.arreglociudades.push(city[0]);
                if (historial.length === 0){
                  this.dibujaContagios(ct, (Math.random() * (150 - 10) + 10));
                }else{
                  const ultimaFecha = historial.pop();
                  const {activos} = ultimaFecha;
                  this.dibujaContagios(ct, activos);
                }
              }
          });
        }
      }
    );
  }

  dibujaContagios(ct: any, contagios: number): void{
    let lines: google.maps.Polygon;
    var cordenadas = [
      new google.maps.LatLng(this.lat, this.lng),
      new google.maps.LatLng(ct.latitude, ct.longitude)
    ];
    this.setMarker(new google.maps.LatLng(ct.latitude, ct.longitude), `${ct.city} CONTAGIOS: ${Math.trunc(contagios)}`);
    this.setCircles(new google.maps.LatLng(ct.latitude, ct.longitude), contagios);
    lines = new google.maps.Polygon({
      paths: cordenadas,
      strokeColor: "#0000CC",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#0000CC",
      fillOpacity: 0.35,
    });
    lines.setMap(this.map);
    this.arrayLines.push(lines);

  }

  setCircles(cordenadas: any, population: number): void{
    let colorBase = "#FF0000";

    if (population < 150 && population > 100)
    {
      colorBase = "#dd5500";
    }else if (population <= 100 && population > 50)
    {
      colorBase = "#ffff56";
    }else if (population <= 50)
    {
      colorBase = "#218e16";
    }

    const cityCircle = new google.maps.Circle({
      strokeColor: colorBase,
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: colorBase,
      fillOpacity: 0.35,
      map: this.map,
      center: cordenadas,
      radius: Math.sqrt(population / 5) * 50,
    });
    this.arrayCircles.push(cityCircle);

  }

  setMarker(cordenadas: any, info: string): void{
    const infowindow = new google.maps.InfoWindow();
    infowindow.setContent(info);
    const marker = new google.maps.Marker({
      position: cordenadas,
      map: this.map
    });
    marker.addListener("click", () => {
      infowindow.open(this.map, marker);
    });
    this.markersArray.push(marker);
  }

  buscarCiudad(nombre: string): void {
    let ciudad = this.httpCovid.getCityMatch(nombre);
    ciudad.then( datos => {
      let {city} = datos;
      this.miCiudadGeneral = city[0];
      if (city.length !== 0){
        this.clearFig();
        this.setCordenadas(city[0].latitud, city[0].longitud);
        this.buildMapa(city[0].latitud, city[0].longitud);
        this.miCiudadHistorial = city[0].historial;
      }
    });
  }

  clearFig():void {
    for (let line of this.arrayLines){
      line.setMap(null);
    }
    for (let ct of this.arrayCircles){
      ct.setMap(null);
    }
    for (let mk of this.markersArray){
      mk.setMap(null);
    }
    this.arrayCircles = [];
    this.arrayLines = [];
    this.markersArray = [];
  }

  setCordenadas(latitud: number, longitud: number): void{
    this.lat = latitud;
    this.lng = longitud;
  }

  getCordenadas(): number[]{
    return [this.lat, this.lng];
  }

  buildMapa(latitud: number, longitud: number): void{
    const pos = {
      lat: latitud,
      lng: longitud
    };
    this.setCordenadas(latitud, longitud);
    this.coordinates = new google.maps.LatLng(pos);
    this.setMarker(this.coordinates, "Tu ubicacion");
    this.setCircles(this.coordinates, 200);
    this.map.setCenter(pos);
    this.drawCasesAround();
  }

}
