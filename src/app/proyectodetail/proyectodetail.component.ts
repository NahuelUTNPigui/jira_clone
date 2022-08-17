import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../models/Proyecto';
import { ProyectoService } from '../services/proyecto.service';
@Component({
  selector: 'app-proyectodetail',
  templateUrl: './proyectodetail.component.html',
  styleUrls: ['./proyectodetail.component.css']
})
export class ProyectodetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router,private proyectoService:ProyectoService) { }

  proyectoSeleccionado?:Proyecto
  ngOnInit(): void {
    this.getProyecto()
  }
  getProyecto(){
    
    this.proyectoService.getProyecto(Number(this.route.snapshot.paramMap.get('id')))
    .subscribe(p=>{
        this.proyectoSeleccionado=p;
        
      })
  }
  backlog(){
    this.router.navigateByUrl(`/detailproyecto/${this.proyectoSeleccionado?.id}/backlog`)
  }
  board(){
    this.router.navigateByUrl(`/detailproyecto/${this.proyectoSeleccionado?.id}/board`)
    
  }
  usescases(){
    this.router.navigateByUrl(`/detailproyecto/${this.proyectoSeleccionado?.id}/usecases`)
    
  }
  tareas(){
    this.router.navigateByUrl(`/detailproyecto/${this.proyectoSeleccionado?.id}/tareas`)
  }
  settings(){
    this.router.navigateByUrl(`/detailproyecto/${this.proyectoSeleccionado?.id}/conf`)
    
  }

}
