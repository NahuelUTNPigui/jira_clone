import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproyectoComponent } from './addproyecto/addproyecto.component';
import { AddusecaseComponent } from './addusecase/addusecase/addusecase.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { DelproyectoComponent } from './conf/delproyecto/delproyecto.component';
import { EstadosComponent } from './conf/estados/estados.component';
import { MainconfComponent } from './conf/mainconf/mainconf.component';
import { TipoactividadesComponent } from './conf/tipoactividades/tipoactividades.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { ProyectodetailComponent } from './proyectodetail/proyectodetail.component';
import { SettingsComponent } from './settings/settings.component';
import { ActividadComponent } from './tareas/actividad/actividad.component';
import { BugComponent } from './tareas/bug/bug.component';
import { FeatureComponent } from './tareas/feature/feature.component';
import { ListaComponent } from './tareas/lista/lista.component';
import { TareasComponent } from './tareas/tareas.component';
import { UsecasesComponent } from './usecases/usecases.component';

const routes: Routes = [
  {path:'',redirectTo:"proyectos",pathMatch:'full'},
  { path: 'proyectos', component: ListaProyectosComponent },
  {path:'addproyecto',component:AddproyectoComponent},
  {path:'detailproyecto/:id',component:ProyectodetailComponent,
    children:[
      {path:'board',component:BoardComponent},
      {path:'backlog',component:BacklogComponent},
      {path:'usecases',component:UsecasesComponent,pathMatch:'full'},
      {path:'usecases/addusecase',component:AddusecaseComponent},
      {path:'conf',component:MainconfComponent},
      {path:'settings',component:SettingsComponent},
      {path:'estados',component:EstadosComponent},
      {path:'tipoactividades',component:TipoactividadesComponent},
      {path:'eliminarproyecto',component:DelproyectoComponent},
      
      {path:'tareas/actividad',component:ActividadComponent},
      {path:'tareas/bug',component:BugComponent},
      {path:'tareas/feature',component:FeatureComponent},
      {path:'tareas/lista',component:ListaComponent},
      {path:'tareas',component:TareasComponent,pathMatch:'full'}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
