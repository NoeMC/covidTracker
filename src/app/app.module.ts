import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarraSComponent } from './componets/shared/barra-s/barra-s.component';
import { FooterComponent } from './componets/shared/footer/footer.component';
import { HomeComponent } from './componets/home/home.component';
import { APP_ROUTING } from './app.routes';
import { MapaComponent } from './componets/mapa/mapa.component';
import { ContagiosGeneralesComponent } from './componets/contagios-generales/contagios-generales.component';
import { ChartsModule } from 'ng2-charts';
import { AuthModule } from '@auth0/auth0-angular';
import { AdminHomeComponent } from './componets/admin-home/admin-home.component';
import { HttpClientModule} from '@angular/common/http';
import { EstadisticasComponent } from './componets/estadisticas/estadisticas.component';
import { LoadingComponent } from './componets/shared/loading/loading.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyComponent } from './componets/shared/notify/notify.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    BarraSComponent,
    FooterComponent,
    HomeComponent,
    MapaComponent,
    ContagiosGeneralesComponent,
    AdminHomeComponent,
    EstadisticasComponent,
    LoadingComponent,
    NotifyComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    ChartsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-dkjnpzk1.us.auth0.com',
      clientId: '6yAucBTzv3r9YtCAV6U284l5OJPBZT6k'
    }),
    NoopAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
