import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RestcovidService } from '../../servicios/restcovid.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  npg = 1;
  datosEstado: any;
  datosHistorial: any;
  datosPais: any;
  datosHistorialPais: any;
  fecha: any;
  limitesPais = [0, 100000, 150000];
  limitesEstado = [0, 40000, 2000];

  constructor(private server:RestcovidService, private _rutas: Router,) {
    this.fecha = new Date();
   }

  ngOnInit(): void {
    const Puebla = this.recuperaInfoEstado('Puebla');
    Puebla.then(valor => {
      this.datosEstado = valor.state[0];
      this.datosHistorial = this.datosEstado.historial;
    });
    const mexico = this.recuperaInfoEstado('Mexico');
    mexico.then(valor => {
      this.datosPais = valor.state[0];
      this.datosHistorialPais = this.datosPais.historial;
    });
  }

  recuperaInfoEstado(nombre: string): any {
    return this.server.getEstado(nombre);
  }
  navegarPara(nombre: string): void{
    this._rutas.navigate([nombre]);
  }

}
