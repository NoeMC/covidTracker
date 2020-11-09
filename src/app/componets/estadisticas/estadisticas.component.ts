import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit, OnChanges {
  @Input() datos:any;
  acumulados = 2000;
  activos = 2000;
  muertesAcumulado = 2000;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.datos){
      if(this.datos.length !== 0){
        let ultima = this.datos[this.datos.length - 1 ];
        this.acumulados = ultima.acumulados;
        this.activos = ultima.activos;
        this.muertesAcumulado = ultima.muertesAcumulado;
      }
    }
  }

}
