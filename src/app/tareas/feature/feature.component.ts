import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { EstadoTarea } from 'src/app/models/EstadoTarea';
import { EstadotareasService } from 'src/app/services/estadotareas.service';
import { ActivatedRoute } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  idEstado:number=0
  estados:EstadoTarea[]=[]
  idP:number=0
  //Tarea
  nombre:string=""
  descripcion:string=""
  backlog:boolean=true
  backlog_actual:boolean=false
  //Info
  esfuerzo_estimado:number=0
  prioridad:number=0
  gravedad:number=0
  //Criterio
  criterios:Criterio[]=[]
  nombre_criterio:string=""
  verificado_criterio:boolean=false
  idCriterio:number=-1
  constructor(
    private route: ActivatedRoute,
    private _location:Location, 
    private estadoTareaService:EstadotareasService,
  ) { }

  ngOnInit(): void {
    this.getIdProyecto()
    this.getAllData()
  }
  getAllData(){
    this.estadoTareaService.getEstadosTarea(this.idP).subscribe(es=>this.estados=es)
  }
  getIdProyecto(){
    this.idP=Number(this.route.parent?.snapshot.paramMap.get('id'))
  }
  volver(){
    this._location.back()
  }
  validar(){
    return true
  }
  guardar(){}
  actualizarInput(){
    let estado_elegido=this.estados.filter(e=>e.id===Number(this.idEstado))
    let criterio_elegido=this.criterios.filter(c=>c.id===Number(this.idCriterio))
    if(estado_elegido.length===1){
      this.idEstado=estado_elegido[0].id
    }
    if(criterio_elegido.length===1){
      this.idCriterio=criterio_elegido[0].id
      this.nombre_criterio=criterio_elegido[0].nombre
    }
  }
  nuevoFeature(){
    this.idEstado=0
    this.nombre=""
    this.descripcion=""
    this.esfuerzo_estimado=0
    this.gravedad=0
    this.prioridad=0
    this.criterios=[]
    this.nuevoCriterio()
  }
  nuevoCriterio(){
    this.idCriterio=-1
    this.nombre_criterio=""
    this.verificado_criterio=false
  }
  agregarCriterio(){
    if(this.nombre_criterio!==""){
      let c:Criterio={
        id:this.criterios.length+1,
        nombre:this.nombre_criterio,
        cod_verificable:-1,
        aceptado:this.verificado_criterio
      }
      this.criterios.push(c)
      this.nuevoCriterio()
    }
  }
  quitarCriterio(){
    if(this.idCriterio){
      this.criterios=this.criterios.filter(c=>c.id!==this.idCriterio)
      this.nuevoCriterio()
    }
  }
}
