import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { AddproyectoComponent } from './addproyecto/addproyecto.component';
import { ProyectodetailComponent } from './proyectodetail/proyectodetail.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { UsecasesComponent } from './usecases/usecases.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { AddusecaseComponent } from './addusecase/addusecase/addusecase.component';
import { MainconfComponent } from './conf/mainconf/mainconf.component';
import { EstadosComponent } from './conf/estados/estados.component';
import { TipoactividadesComponent } from './conf/tipoactividades/tipoactividades.component';
import { DelproyectoComponent } from './conf/delproyecto/delproyecto.component';
import { TareasComponent } from './tareas/tareas.component';
import { BugComponent } from './tareas/bug/bug.component';
import { ActividadComponent } from './tareas/actividad/actividad.component';
import { FeatureComponent } from './tareas/feature/feature.component';
import { ListaComponent } from './tareas/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProyectosComponent,
    AddproyectoComponent,
    ProyectodetailComponent,
    BacklogComponent,
    BoardComponent,
    UsecasesComponent,
    SettingsComponent,
    AddusecaseComponent,
    MainconfComponent,
    EstadosComponent,
    TipoactividadesComponent,
    DelproyectoComponent,
    TareasComponent,
    BugComponent,
    ActividadComponent,
    FeatureComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
