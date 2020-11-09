import { Component, OnInit, ViewChild, Input, OnChanges, ɵCurrencyIndex} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contagios-generales',
  templateUrl: './contagios-generales.component.html',
  styleUrls: ['./contagios-generales.component.css']
})
export class ContagiosGeneralesComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() limites: any;
  historial: any;
  dataActivos: any = [];
  dataMuertos: any = [];
  dataLabels: any = [];
  meses = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");

  public lineChartData: ChartDataSets[] = [
    { data: this.dataMuertos, label: 'Muertes' },
    { data: this.dataActivos, label: 'Casos positivos' }
  ];
  public lineChartLabels: Label[] = this.dataLabels;
  public radarChartOptions: ChartOptions;
  public lineChartColors: Color[] = [
    { //verde
      backgroundColor: 'rgb(77, 144, 142)',
      borderColor: 'rgb(77, 144, 142)',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgb(249, 65, 68)',
      borderColor: 'rgb(249, 65, 68)',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { 
    this.radarChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
              suggestedMin: 1000,
              suggestedMax: 50000,
              stepSize: 15000
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
              unit: 'month',
              displayFormats: {
                day: 'll'
            }
          }
      }]
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.data){
      this.mapeaDatos(this.data);
      this.extraerPuntos(this.historial);
      this.radarChartOptions = {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
                suggestedMin: this.limites[0],
                suggestedMax: this.limites[1],
                stepSize: this.limites[2]
            }
          }],
          xAxes: [{
            type: 'time',
            time: {
                unit: 'month',
                displayFormats: {
                  day: 'll'
              }
            }
        }]
        }
      };
    }

  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  mapeaDatos(datosBrutos: any): void{
    this.historial = datosBrutos.historial;
  }

  extraerPuntos(datosBrutos:any): void{
    for(let item of datosBrutos){
      this.dataActivos.push(item.acumulados);
      this.dataMuertos.push(item.muertesAcumulado);
      let fech = new Date(item.fecha);
      let dia = fech.getDate();
      let mes = fech.getMonth();
      this.dataLabels.push(fech);
    }
  }
}
