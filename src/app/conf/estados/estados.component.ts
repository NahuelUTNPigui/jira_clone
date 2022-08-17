import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstadoTarea } from 'src/app/models/EstadoTarea';
import { EstadotareasService } from 'src/app/services/estadotareas.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  estados:EstadoTarea[]=[]
  id_estado=-1
  orden:number=0
  orden_anterior:number=0
  nombre:string=""
  cod_proyecto:number=0
  constructor(private _location:Location,private route:ActivatedRoute,private estadosService:EstadotareasService) { }

  ngOnInit(): void {
    this.cod_proyecto=Number(this.route.parent?.snapshot.paramMap.get('id'))
    this.getAllEstados()
  }
  getAllEstados(){
    
    this.estadosService.getEstadosTarea(this.cod_proyecto).subscribe(ets=>{this.estados=ets;this.estados.sort((e1,e2)=>e1.orden-e2.orden)})
    
  }
  actualizarInputs(){
    let estado_elegido=this.estados.filter(e=>e.id===Number(this.id_estado))
    if(estado_elegido.length>0){
      let estado=estado_elegido[0]
      this.id_estado=estado.id
      this.nombre=estado.nombre
      this.orden=estado.orden
      let orden_anterior=estado.orden
      this.orden_anterior=orden_anterior
    }
  }
  nuevo(){
    this.id_estado=-1
    this.nombre=""
    this.orden=0
    this.orden_anterior=0
  }
  validarEstado(id_estado:number,orden:number,nombre:string,add:boolean){
    return (add && id_estado===-1 || !add && id_estado!==-1) && orden>0 && nombre.trim().length>0
  }
  createEstado(id:number,nombre:string,orden:number,cod_proyecto:number){
    let n_estado:EstadoTarea={
      id,
      nombre,
      orden,
      cod_proyecto
    }
    return n_estado    
  }
  maxOrden(orden:number){
    if(orden>this.estados[this.estados.length-1].orden){
      orden=this.estados[this.estados.length-1].orden+1
    }
    return orden
  }
  ordenCambiado(orden_inicial:number,orden_final:number){
    for(let i =0 ;i<this.estados.length;i++){
      if(this.estados[i].orden>=orden_final && this.estados[i].orden<orden_inicial){
        return true
      }
    }    
    return false
  }
  agregar(){ 
    if(this.validarEstado(this.id_estado,this.orden,this.nombre,true)){
      let MAX= this.maxOrden(1000)
      this.orden=this.maxOrden(this.orden)
      let n_estado=this.createEstado(-1,this.nombre,this.orden,this.cod_proyecto)
      let orden_cambiado=this.ordenCambiado(MAX+1,this.orden)
      console.log("add orden cambiado: ",orden_cambiado)
      if(orden_cambiado){
         this.estadosService.addEstadoTareaOrdenCambiado(this.cod_proyecto,n_estado).subscribe(()=>this.getAllEstados())
      }
      else{
        this.estadosService.addEstadoTarea(this.cod_proyecto,n_estado).subscribe(()=>this.getAllEstados())
      }
      
      this.nuevo()
      
    }
  }
  modificar(){
    if(this.validarEstado(this.id_estado,this.orden,this.nombre,false)){
      this.orden=this.maxOrden(this.orden)
      let n_estado=this.createEstado(this.id_estado,this.nombre,this.orden,this.cod_proyecto)
      let orden_cambiado=this.ordenCambiado(this.orden_anterior,this.orden)
      console.log("mod orden cambiado: ",orden_cambiado)
      if(orden_cambiado){
        this.estadosService.modEstadoTareaOrdenCambiado(this.cod_proyecto,n_estado,this.orden_anterior).subscribe( ()=>this.getAllEstados())
      }
      else{
        this.estadosService.modEstadoTarea(this.cod_proyecto,n_estado).subscribe(()=>this.getAllEstados())
      }

    }
  }
  //Deberia normalizar los ordenes aca
  quitar(){
    if(this.id_estado !==-1){
      this.estadosService.delEstadoTarea(this.cod_proyecto,this.orden).subscribe(()=>this.getAllEstados())
      
      this.nuevo()
      
    }
  }
  volver(){
    this._location.back()
  }

}
