import { Injectable } from '@angular/core';
import { TipoTarea } from '../models/TipoTarea';
@Injectable({
  providedIn: 'root'
})
export class TipotareaService {

  tipoTareas:TipoTarea[]=[
    {
      id:1,
      nombre:'bug'
    },{
      id:2,
      nombre:'feature'
    },
    {
      id:3,
      nombre:'actividad'
    }
  ]
  constructor() { }
  getTipos():TipoTarea[]{
    return this.tipoTareas
  }
  getTipo(id:number):TipoTarea|null{
    if(id<1|| id >3){
      return null
    }
    return this.tipoTareas[id-1]
  }  
}
