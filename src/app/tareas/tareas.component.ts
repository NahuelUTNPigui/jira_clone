import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  idP:number=0
  constructor(private route: ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.getIdProyecto()
  }
  getIdProyecto(){
    this.idP=Number(this.route.parent?.snapshot.paramMap.get('id'))
  }
  verTareas(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/tareas/lista`)
  }
  agregarActividad(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/tareas/actividad`)
  }
  agregarBug(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/tareas/bug`)
  }
  agregarFeature(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/tareas/feature`)
  }
}
