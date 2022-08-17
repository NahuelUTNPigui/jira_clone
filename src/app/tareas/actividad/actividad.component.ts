import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { TipotareaService } from 'src/app/services/tipotarea.service';
import { EstadotareasService } from 'src/app/services/estadotareas.service';
import { TipoactividadService } from 'src/app/services/tipoactividad.service';
import { EstadoTarea } from 'src/app/models/EstadoTarea';
import { TipoTarea } from 'src/app/models/TipoTarea';
import { TipoActividad } from 'src/app/models/TipoActividad';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from 'src/app/services/actividad.service';
import { Actividad } from 'src/app/models/Actividad';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  
  estados:EstadoTarea[]=[]
  tipoActividades:TipoActividad[]=[]
  idEstado:number=0
  idTipoTarea=1
  idTipoActividad=0
  nombre_tipo_actividad=""
  nombre_nuevo_tipo_actividad=""
  idP:number=0

  //Valores propios de la actividad
  //Tarea
  nombre:string=""
  descripcion:string=""
  backlog:boolean=true
  backlog_actual:boolean=false
  //Info
  esfuerzo_estimado:number=0
  prioridad:number=0
  gravedad:number=0
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private _location:Location, 
    private tipoTareaService:TipotareaService,
    private tipoActividadService:TipoactividadService,
    private estadoTareaService:EstadotareasService,
    private actividadService: ActividadService) {
    }

  ngOnInit(): void {
    this.getIdProyecto()
    this.getAllData()
  }
  getIdProyecto(){
    this.idP=Number(this.route.parent?.snapshot.paramMap.get('id'))
    
  }
  getAllData(){
    this.tipoActividadService.getTipoActividadProyecto(this.idP).subscribe(tas=>this.tipoActividades=tas)
    this.estadoTareaService.getEstadosTarea(this.idP).subscribe(es=>this.estados=es)
  }
  actualizarInput(){
    let tipo_elegido=this.tipoActividades.filter(t=>t.id===Number(this.idTipoActividad))
    let estado_elegido=this.estados.filter(e=>e.id===Number(this.idEstado))
    if(tipo_elegido.length==1){
      this.nombre_tipo_actividad=tipo_elegido[0].nombre
      this.idTipoActividad=tipo_elegido[0].id
    }
    if(estado_elegido.length===1){
      this.idEstado=estado_elegido[0].id
    }
  }
  validar(){
    
    return true
  }
  //Aca debo guardar la tarea como actividad y su info
  guardar(){
    if(this.validar()){
      let actividad:Actividad={
        id:-1,
        cod_proyecto:this.idP,
        nombre:this.nombre,
        descripcion:this.descripcion,
        cod_estado:this.idEstado,
        backlog:this.backlog,
        backlog_actual:this.backlog_actual,
        cod_tipo_tarea:1,
        //Hago la union de 2 clases para que sea mas facil guardarlo
        esfuerzo_estimado:this.esfuerzo_estimado,
        prioridad:this.prioridad,
        gravedad:this.gravedad,
        tipo_actividad:this.idTipoActividad
      }
      this.actividadService.addActvidad(this.idP,actividad).subscribe(a=>this.nuevo())

    }
  }
  nuevo(){
    //Tarea
    this.nombre=""
    this.descripcion=""
    this.backlog=true
    this.backlog_actual=false
    //Info
    this.esfuerzo_estimado=0
    this.prioridad=0
    this.gravedad=0
    this.idTipoActividad=0
    this.nombre_tipo_actividad=""
    this.nombre_nuevo_tipo_actividad=""
    this.idEstado=0
  }
  agregarTipoActividad(){
    if(this.nombre_nuevo_tipo_actividad && this.nombre_nuevo_tipo_actividad!==""){
      let nuevo_tipo_actividad:TipoActividad={
        id:-1,
        nombre:this.nombre_nuevo_tipo_actividad,
        cod_proyecto:this.idP
      }
      this.tipoActividadService.addTipoActividad(this.idP,nuevo_tipo_actividad).subscribe(()=>this.tipoActividadService.getTipoActividadProyecto(this.idP).subscribe(tas=>this.tipoActividades=tas))
      this.nuevoTipoActividad()
    }
  }
  nuevoTipoActividad(){
    this.nombre_nuevo_tipo_actividad=""
  }
  eliminarTipoActividad(){
    if(this.nombre_tipo_actividad && this.nombre_tipo_actividad!=="" && this.idTipoActividad!==-1){

      this.tipoActividadService.delTipoActividad(this.idP,this.idTipoActividad).subscribe(()=>this.tipoActividadService.getTipoActividadProyecto(this.idP).subscribe(tas=>this.tipoActividades=tas))
      this.idTipoActividad=-1
      this.nombre_tipo_actividad=""
    }
  }
  volver(){
    this._location.back()
  }

}
