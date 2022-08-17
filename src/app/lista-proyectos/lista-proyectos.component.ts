import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { ProyectoService } from '../services/proyecto.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {

  proyectos:Proyecto[]=[]
  constructor(private router:Router,private proyectoService:ProyectoService) { }
  
  ngOnInit(): void {
    this.getProyectos()
  }
  getProyectos(){
    this.proyectoService.getProyectos().subscribe(ps=>{this.proyectos=ps})
  }
  agregar(){
    this.router.navigateByUrl('/addproyecto')
  }
  detalle(id:number){
    
    this.router.navigateByUrl('/detailproyecto/'+id+'/backlog')
  }
}
