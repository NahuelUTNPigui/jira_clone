import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-delproyecto',
  templateUrl: './delproyecto.component.html',
  styleUrls: ['./delproyecto.component.css']
})
export class DelproyectoComponent implements OnInit {

  constructor( private _location:Location) { }

  ngOnInit(): void {
  }
  volver(){
    this._location.back()
  }

}
