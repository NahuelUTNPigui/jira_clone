import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-mainconf',
  templateUrl: './mainconf.component.html',
  styleUrls: ['./mainconf.component.css']
})
export class MainconfComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router,private _location:Location) { }

  idP:number=0

  ngOnInit(): void {
    this.getIdProyecto()
  }
  getIdProyecto(){
    this.idP=Number(this.route.parent?.snapshot.paramMap.get('id'))
  }
  
  editarProyecto(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/settings`)
  }
  editarEstados(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/estados`)
  }
  editarTipoActividades(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/tipoactividades`)
  }
  eliminarProyecto(){
    this.router.navigateByUrl(`/detailproyecto/${this.idP}/eliminarproyecto`)
  }
  volver(){
    this._location.back()
  }
}
