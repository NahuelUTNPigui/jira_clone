import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
@Component({
  selector: 'app-addproyecto',
  templateUrl: './addproyecto.component.html',
  styleUrls: ['./addproyecto.component.css']
})
export class AddproyectoComponent implements OnInit {

  constructor(private router:Router,private proyectoService:ProyectoService) { }

  proyecto:Proyecto={
    id:-1,
    nombre:'',
    descripcion:'',
    version:'0.0.1',
    temas:'mate arte',
    fecha_fin:'',
    fecha_inicio:(new Date(Date.now())).toISOString()
  }
  
  ngOnInit(): void {
  }
  volver(){
    this.router.navigateByUrl('/')
  }
  guardar(){
    if(this.proyecto.nombre!==""){
      
      this.proyectoService.addAPI(this.proyecto).subscribe()
    }else{
      alert("sos tonto? el nombre papa")
    }

  }

}
