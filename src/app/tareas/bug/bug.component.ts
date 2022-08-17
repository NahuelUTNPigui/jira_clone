import { Component, OnInit } from '@angular/core';
import { EstadoTarea } from 'src/app/models/EstadoTarea';
@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  idEstado:number=0
  estados:EstadoTarea[]=[]

  constructor() { }

  ngOnInit(): void {
  }
  volver(){}
  guardar(){}
  actualizarInput(){}

}
