import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseCase } from 'src/app/models/UseCase';
import { UsecaseService } from 'src/app/services/usecase.service';
import { Location } from '@angular/common'
import { Criterio } from 'src/app/models/Criterio';
import { CriterioservicesService } from 'src/app/services/criterioservices.service';
@Component({
  selector: 'app-addusecase',
  templateUrl: './addusecase.component.html',
  styleUrls: ['./addusecase.component.css']
})
export class AddusecaseComponent implements OnInit {

  id:number=0  
  usecase:UseCase={
    id:-1,
    nombre:"",
    descripcion:"",
    cod_proyecto:-1,
    cod_verificable:-1
  }
  criterios:Criterio[]=[
    {id:1,nombre:"nada",cod_verificable:1,aceptado:false},
    {id:2,nombre:"2",cod_verificable:1,aceptado:false},
    {id:3,nombre:"3",cod_verificable:1,aceptado:false}
  ]
  nombreCriterio:string=""
  ultimoId:number=0
  criterioSeleccionado:Criterio={
    id:0,
    nombre:"",
    cod_verificable:-1,
    aceptado:false
  }
  constructor(private _location:Location,private route:ActivatedRoute, private useCaseService:UsecaseService,private criteriosService:CriterioservicesService) {
   
   }

  ngOnInit(): void {
    let cod_proyecto=Number(this.route.parent?.snapshot.paramMap.get('id'))
    this.usecase.cod_proyecto=cod_proyecto
  }
  guardar(){
    if(this.usecase.nombre!==""){
      let uc_db:UseCase|any={}
      this.useCaseService.addUseCase(this.usecase).subscribe(uc=>uc_db=uc)
      if(this.criterios.length>0){
        let criterios_db:Criterio[]=this.criterios.map(c=>{return {
          id:-1,
          nombre:c.nombre,
          aceptado:false,
          cod_verificable:c.cod_verificable
          }
        })
      this.criteriosService.addCriterios(uc_db.cod_proyecto,criterios_db).subscribe()
      }

      
    }else{
      alert("Sos tonto paapa? el nombre")
    }
  }
  volver(){
    this._location.back()
  }
  nuevo_criterio(){
    this.criterioSeleccionado={
      id:0,
      nombre:"",
      cod_verificable:-1,
      aceptado:false
    }
    this.nombreCriterio=""
    this.id=0

    
  }
  show(){
    console.log(this.id)

  }
  agregar_criterio(){
    if(this.id===0&&this.nombreCriterio.trim().length>0){
      let id=1
      if(this.criterios.length!==0){
        id =this.criterios[this.criterios.length-1].id+1
      }
      let n_criterio:Criterio={
        id,
        nombre:this.nombreCriterio,
        cod_verificable:-1,
        aceptado:false
      }
      this.criterios.push(n_criterio)  
      console.log(n_criterio.id)
    }

  }
  quitar_criterio(){
    
    if(this.id!==0){
      
      this.criterios=this.criterios.filter(c=>c.id!=this.id)
      this.criterioSeleccionado={
        id:0,
        nombre:"",
        cod_verificable:-1,
        aceptado:false
      }
      console.log(this.criterios)
    }
  }
}
