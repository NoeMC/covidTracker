import {Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {startWith, switchMap} from 'rxjs/operators';
import {RestcovidService } from '../../servicios/restcovid.service';
import { NotifyComponent } from '../shared/notify/notify.component';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  colornb = '#229990';
  npg = 3;
  durationInSeconds = 2;

  control = new FormControl();
  filteredStreets: any[] = [];

  constructor(private covid_service: RestcovidService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      startWith(''),
      switchMap((value: string) => this.covid_service.getCityMatch(value))
    )
    .subscribe((users: any) => this._filtrar(users));
  }

  _filtrar(valor): void{
    this.filteredStreets = [];
    let {city} = valor;
    for (let index of city){
      this.filteredStreets.push(index.nombre);
    }
  }

  llenarBaseDatos(nombre:any, fecha:any, ac:any, mt:any, vg:any, nv:any): void{
    if (!nv || !nombre || !fecha || !ac || !mt || !vg){
    }else{
      let dates = new Date( new Date(fecha).getFullYear(), new Date(fecha).getMonth(), new Date(fecha).getDate());
      console.log(dates);
      let otro = this.covid_service.putHistorialCiudad(nombre, fecha,nv,mt,vg,nv,ac);
      otro.then(info => console.log(info));
    }
  }
  openSnackBar(): void {
    this._snackBar.openFromComponent(NotifyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
