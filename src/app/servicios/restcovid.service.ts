import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestcovidService {

  URI = 'https://restcovid19.herokuapp.com';

  constructor(private http:HttpClient) { }

  getCity(nombre: string): any {
    const body = new HttpParams()
    .set('nombre', nombre);

    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //asi se conviernte en promesa cuaquier un objeto de tipo resolve
    return this.http.get('https://restcovid19.herokuapp.com/ciudad',{headers:header, params: body}).toPromise();

  }

  getCityMatch(nombre: string): any {
    const body = new HttpParams()
    .set('nombre', nombre);

    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //asi se conviernte en promesa cuaquier un objeto de tipo resolve
    return this.http.get('https://restcovid19.herokuapp.com/matchciudad',{headers:header, params: body}).toPromise();

  }

  getEstado(nombre: string): any{
    const body = new HttpParams()
    .set('nombre', nombre);

    return this.http.get(`${this.URI}/estado`,{params: body}).toPromise();

  }

  putHistorialCiudad(ciudad:any, fecha:any, activos:any, muertes:any, nuevosC:any, muertesacu: any,  acumulados:any): any{
    const body = new HttpParams()
    .set('nombre', ciudad)
    .set('date', fecha)
    .set('activos', activos)
    .set('muertes', muertes)
    .set('nuevoscasos', nuevosC)
    .set('muertesacu', muertesacu)
    .set('acumulados', acumulados);

    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.put(`${this.URI}/historialCity`, body, {headers: header}).toPromise();
  }

}
