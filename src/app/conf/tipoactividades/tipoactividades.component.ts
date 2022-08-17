import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TipoActividad } from 'src/app/models/TipoActividad';
import { TipoactividadService } from 'src/app/services/tipoactividad.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tipoactividades',
  templateUrl: './tipoactividades.component.html',
  styleUrls: ['./tipoactividades.component.css']
})
export class TipoactividadesComponent implements OnInit {
  tipos:TipoActividad[]=[]
  id_tipo=-1
  nombre:string=""
  cod_proyecto:number=0
  constructor( private _location:Location,private route:ActivatedRoute,private tipoService:TipoactividadService) { }

  ngOnInit(): void {
    this.cod_proyecto=Number(this.route.parent?.snapshot.paramMap.get('id'))
    this.getAllActividades()
  }
  getAllActividades(){
    this.tipoService.getTipoActividadProyecto(this.cod_proyecto).subscribe(t_s=>this.tipos=t_s)
  }
  nuevo(){
    this.id_tipo=-1
    this.nombre=""
  }
  agregar(){
    if(this.id_tipo===-1){
      let tipoactividad:TipoActividad={
        id:-1,
        nombre:this.nombre,
        cod_proyecto:this.cod_proyecto,
      }
      this.tipoService.addTipoActividad(this.cod_proyecto,tipoactividad).subscribe(()=>this.getAllActividades())
      this.nuevo()
    }
  }
  eliminar(){
    console.log(this.id_tipo)
    if(this.id_tipo!==-1){
      this.tipoService.delTipoActividad(this.cod_proyecto,this.id_tipo).subscribe(()=>this.getAllActividades())
      this.nuevo()
    }
  }
  actualizarInput(){
    let tipo_elegido=this.tipos.filter(t=>t.id===Number(this.id_tipo))
    if(tipo_elegido.length==1){
      this.nombre=tipo_elegido[0].nombre
      this.id_tipo=tipo_elegido[0].id
      
    }
  }
  volver(){
    this._location.back()
  }

}
