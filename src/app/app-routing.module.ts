import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../app/ui/layout/layout.component'
import { AltasComponent} from '../app/Actividades/altas/altas.component'
import { ConsultarComponent } from 'src/app/Actividades/consultar/consultar.component';
import { EditarComponent } from 'src/app/Actividades/editar/editar.component';
export const routes: Routes = [
  { path: 'Altas', component: AltasComponent },
  { path: 'Consulta', component: ConsultarComponent },
  { path: 'Editar/:idPaciente', component: EditarComponent },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}