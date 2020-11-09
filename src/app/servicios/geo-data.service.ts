import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {
  keyAPI = 'GGBWX7CQZP8XCOIY1VVD5DDPDZQCGGMN';

  constructor(private http:HttpClient) { }

  getNCities(lat: string, lng: string, numberCities: number): any {
    const body = new HttpParams()
                      .set('lat', lat)
                      .set('lng', lng)
                      .set('nmax', `${numberCities}`)
                      .set('key', this.keyAPI);

    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get('https://restcovid19.herokuapp.com/citiesAround',{headers:header, params: body});
  }

  getCity(nombre: string): any {
    const body = new HttpParams()
    .set('nombre', nombre);

    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //asi se conviernte en promesa cuaquier un objeto de tipo resolve
    return this.http.get('https://restcovid19.herokuapp.com/ciudad',{headers:header, params: body}).toPromise();

  }

}
