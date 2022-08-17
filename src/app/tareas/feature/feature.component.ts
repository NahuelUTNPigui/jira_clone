import { Component, OnInit } from '@angular/core';
import { EstadoTarea } from 'src/app/models/EstadoTarea';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  idEstado:number=0
  estados:EstadoTarea[]=[]
  constructor() { }

  ngOnInit(): void {
  }
  volver(){}
  guardar(){}
  actualizarInput(){}
}
