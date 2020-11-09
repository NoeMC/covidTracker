import { Component, Inject, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-barra-s',
  templateUrl: './barra-s.component.html',
  styleUrls: ['./barra-s.component.css']
})
export class BarraSComponent implements OnInit {

  bandera: boolean = false;

  @Input() bg: string;
  @Input() NPG: number;

  constructor(private _rutas: Router, public auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
  }

  cambiarEstado(): void {
    this.bandera = !this.bandera;
  }
  getEstado(): boolean {
    return this.bandera;
  }
  navegarPara(nombre: string): void{
    this._rutas.navigate([nombre]);
  }

  logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
