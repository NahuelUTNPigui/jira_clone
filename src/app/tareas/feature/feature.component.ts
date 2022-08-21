import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { EstadoTarea } from 'src/app/models/EstadoTarea';
import { EstadotareasService } from 'src/app/services/estadotareas.service';
import { ActivatedRoute } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { Feature } from 'src/app/models/Feature';
import { FeatureserviceService } from 'src/app/services/featureservice.service';
import { UsecaseService } from 'src/app/services/usecase.service';
import { UseCase } from 'src/app/models/UseCase';
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
  criterio_elegido:Criterio={
    id:-1,
    nombre:"",
    cod_verificable:-1,
    aceptado:false
  }
  //Feature
  cod_use_case=-1
  nombre_use_case=""
  constructor(
    private route: ActivatedRoute,
    private _location:Location, 
    private estadoTareaService:EstadotareasService,
    private featureService:FeatureserviceService,
    private useCaseService: UsecaseService
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
    if(this.nombre!=="" && this.nombre_use_case!==""){
      return true
    }
    else{
      return true
    }
  }

  guardar(){
    if(this.validar()){
      let f:Feature={
        id:-1,
        cod_use_case:this.cod_use_case,
        prioridad:this.prioridad,
        gravedad:this.gravedad,
        esfuerzo_estimado:this.esfuerzo_estimado,
        nombre:this.nombre,
        descripcion:this.descripcion,
        cod_estado:this.idEstado,
        cod_tipo_tarea:2,
        backlog:true,
        backlog_actual:false
      }
      
      this.featureService.addFeature(this.idP,f,this.criterios).subscribe(fyc=>console.log(fyc.feature))
      this.nuevoFeature()
    }
    
  }
  buscarUC(){
    if(this.cod_use_case>0){
      let uc:UseCase={
        id:-1,
        nombre:"",
        descripcion:"",
        cod_proyecto:-1,
        cod_verificable:-1
      }
      this.useCaseService.getUseCase(this.idP,this.cod_use_case).subscribe(uc_bd=>{
        console.log(uc_bd)
        if(uc_bd != null){

          uc=uc_bd
          
          this.cod_use_case=uc.id
          this.nombre_use_case=uc.nombre
        }else{
          this.cod_use_case=-1
          this.nombre_use_case=""
        }  
      })
    }
  }
  actualizarInput(){
    let estado_elegido=this.estados.filter(e=>e.id===Number(this.idEstado))
    let criterio_elegido=this.criterios.filter(c=>c.id===Number(this.idCriterio))
    if(estado_elegido.length===1){
      this.idEstado=estado_elegido[0].id
    }
    if(criterio_elegido.length===1){
      this.criterio_elegido=criterio_elegido[0]  
      this.idCriterio=criterio_elegido[0].id
      this.nombre_criterio=criterio_elegido[0].nombre
      this.verificado_criterio=criterio_elegido[0].aceptado
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
    this.cod_use_case=-1
    this.nombre_use_case=""
    this.nuevoCriterio()
  }
  nuevoCriterio(){
    this.idCriterio=-1
    this.nombre_criterio=""
    this.verificado_criterio=false
    this.criterio_elegido={
      id:-1,
      nombre:"",
      cod_verificable:-1,
      aceptado:false      
    }
  }
  agregarCriterio(){
    if(this.nombre_criterio!==""){
      if(this.idCriterio!==-1){
        this.criterio_elegido.nombre=this.nombre_criterio
        this.criterio_elegido.aceptado=this.verificado_criterio
      }else{
        let c:Criterio={
          id:this.criterios.length+1,
          nombre:this.nombre_criterio,
          cod_verificable:-1,
          aceptado:this.verificado_criterio
        }
        this.criterios.push(c)
  
      }
      this.nuevoCriterio()
    }
  }
  quitarCriterio(){
    if(this.idCriterio!==-1){
      this.criterios=this.criterios.filter(c=>c.id!==this.idCriterio)
      for(let i=0;i<this.criterios.length;i++){
        this.criterios[i].id=i+1
      }
      this.nuevoCriterio()
    }
  }
}
