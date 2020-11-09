import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { MapaComponent } from './componets/mapa/mapa.component';
import { AdminHomeComponent } from './componets/admin-home/admin-home.component';
import { AuthGuard } from '@auth0/auth0-angular';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'mapa', component: MapaComponent },
    { path: 'homeAdmin', component: AdminHomeComponent, canActivate: [AuthGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
