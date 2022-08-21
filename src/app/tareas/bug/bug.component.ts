import { Component, OnInit } from '@angular/core';
import { EstadoTarea } from 'src/app/models/EstadoTarea';
import { Location } from '@angular/common'
import { EstadotareasService } from 'src/app/services/estadotareas.service';
import { BugserviceService } from 'src/app/services/bugservice.service';
import { ActivatedRoute } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { UsecaseService } from 'src/app/services/usecase.service';
import { UseCase } from 'src/app/models/UseCase';
import { BugRecipe } from 'src/app/models/BugRecipe';
import { Precondicion } from 'src/app/models/Precondicion';
import { Bug } from 'src/app/models/Bug';
@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

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
  //Bug Recipe
  //Lo del orden se arreglaria con linked list
  bug_recipe:BugRecipe[]=[]
  descripcion_recipe=""
  orden_recipe=0
  idBugRecipe=-1
  bug_recipe_elegido={
    id:-1,
    descripcion:this.descripcion_recipe,
    orden:0
  }
  //Precondiciones
  precondiciones:Precondicion[]=[]
  condicion_precondicion=""
  idPrecondicion=-1
  precondicion_elegida={
    id:-1,
    condicion:""
  }
  //Bug
  cod_use_case=-1
  nombre_use_case=""
  constructor(
    private route: ActivatedRoute,
    private _location:Location, 
    private estadoTareaService:EstadotareasService,
    private useCaseService: UsecaseService,
    private bugService:BugserviceService
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
    if(this.nombre!=="" && this.nombre_use_case!=="" && this.idEstado!=-1 && this.cod_use_case!=-1){
      return true
    }
    else{
      return false
    }

  }
  guardar(){
    if(this.validar()){
      let bug:Bug={
        id:-1,
        cod_use_case:this.cod_use_case,
        nombre:this.nombre,
        descripcion:this.descripcion,
        cod_estado:this.idEstado,
        backlog:true,
        backlog_actual:false,
        cod_tipo_tarea:3,
        gravedad:this.gravedad,
        esfuerzo_estimado:this.esfuerzo_estimado,
        prioridad:this.prioridad
      }
      this.bugService.addBug(this.idP,bug,this.criterios,this.precondiciones,this.bug_recipe).subscribe(b=>console.log(b))
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
  //No la uso pero es util
  showIds(){
    console.log("ID Bug Recipe : %d",this.idBugRecipe)
    console.log("ID Precondicion : %d",this.idPrecondicion)
    console.log("ID Criterio : %d",this.idCriterio)

  }
  actualizarInput(){
    
    //Si prestas atencion estoy repitiendo codigo
    let estado_elegido=this.estados.filter(e=>e.id===Number(this.idEstado))
    let criterio_elegido=this.criterios.filter(c=>c.id===Number(this.idCriterio))
    let bug_recipe_elegido=this.bug_recipe.filter(bg=>bg.id===Number(this.idBugRecipe))
    let precondicion_elegida=this.precondiciones.filter(p=>p.id===Number(this.idPrecondicion))
    if(estado_elegido.length===1){
      this.idEstado=estado_elegido[0].id
    }
    if(criterio_elegido.length===1){
      this.criterio_elegido=criterio_elegido[0]  
      this.idCriterio=criterio_elegido[0].id
      this.nombre_criterio=criterio_elegido[0].nombre
      this.verificado_criterio=criterio_elegido[0].aceptado
    }
    if(bug_recipe_elegido.length===1){
      this.idBugRecipe=bug_recipe_elegido[0].id
      this.orden_recipe=bug_recipe_elegido[0].orden
      this.descripcion_recipe=bug_recipe_elegido[0].descripcion
      this.bug_recipe_elegido=bug_recipe_elegido[0]
    }
    if(precondicion_elegida.length===1){
      this.idPrecondicion=precondicion_elegida[0].id
      this.condicion_precondicion=precondicion_elegida[0].condicion
      this.precondicion_elegida=precondicion_elegida[0]
    }
    
  }
  //Nuevos
  nuevoCriterio(){
    this.nombre_criterio=""
    this.idCriterio=-1
    this.verificado_criterio=false
    this.criterio_elegido={
      id:-1,
      cod_verificable:-1,
      nombre:"",
      aceptado:false
    }
  }
  nuevoBugRecipe(){
    this.descripcion_recipe=""
    this.orden_recipe=0
    this.idBugRecipe=-1
    this.bug_recipe_elegido={
      descripcion:"",
      orden:0,
      id:-1
    }
  }
  nuevaPrecondicion(){
    this.condicion_precondicion=""
    this.idPrecondicion=-1
    this.precondicion_elegida={
      condicion:"",
      id:-1
    }
  }
  nuevoBug(){
    this.nombre=""
    this.descripcion=""
    this.gravedad=0
    this.prioridad=0
    this.esfuerzo_estimado=0
    this.idEstado=0
    this.cod_use_case=-1
    this.nombre_use_case=""
    this.nuevoCriterio()
    this.nuevoBugRecipe()
    this.nuevaPrecondicion()
  }
  //guardar listas
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
  
  modificarOrdenesBug(){
    for(let i=0;i<this.bug_recipe.length-1;i++){
      let br=this.bug_recipe[i]
      let br_sig=this.bug_recipe[i+1]
      let dif_orden=br_sig.orden-br.orden
      if(dif_orden>1){
        br_sig.orden=br.orden+1
      }else if(dif_orden==0){
        br_sig.orden+=1
      }
    }
    
  }
  pushBugRecipe(bg:BugRecipe,id:number){
    if(id!==-1){
      this.bug_recipe=this.bug_recipe.filter(bg=>bg.id!==id)
    }
    this.bug_recipe.splice(bg.orden-1,0,bg)
    
  }
  guardarBugRecipe(){
    if(this.descripcion_recipe!=="" && this.orden_recipe>0){
      if(this.idBugRecipe!==-1){
        this.bug_recipe_elegido.descripcion=this.descripcion_recipe
        this.bug_recipe_elegido.orden=Number(this.orden_recipe)
        this.pushBugRecipe(this.bug_recipe_elegido,this.idBugRecipe)
      }else{
        let bg:BugRecipe={
          id:this.bug_recipe.length+1,
          descripcion:this.descripcion_recipe,
          orden:Number(this.orden_recipe),
        }
        this.pushBugRecipe(bg,-1)
      }
      this.modificarOrdenesBug()
      this.nuevoBugRecipe()
    }

  }
  quitarBugRecipe(){
    if(this.idBugRecipe!==-1){
      this.bug_recipe=this.bug_recipe.filter(bg=>bg.id!==this.idBugRecipe)
      for(let i=0;i<this.bug_recipe.length;i++){
        this.bug_recipe[i].id=i+1
      }
      this.nuevoBugRecipe()
      this.modificarOrdenesBug()
    }

  }

  guardarPrecondicion(){
    
    if(this.condicion_precondicion!==""){
      
      if(this.idPrecondicion!=-1){
        this.precondicion_elegida.condicion=this.condicion_precondicion
      }else{
        let p:Precondicion={
          id:this.precondiciones.length+1,
          condicion:this.condicion_precondicion
        }
        this.precondiciones.push(p)
        
      }
    }
    this.nuevaPrecondicion()
  }
  quitarPrecondicion(){
    if(this.idPrecondicion!==-1){
      this.precondiciones=this.precondiciones.filter(p=>p.id!==this.idPrecondicion)
      for(let i=0;i<this.precondiciones.length;i++){
        this.precondiciones[i].id=i+1
      }
      this.nuevaPrecondicion()
    }
  }


}
