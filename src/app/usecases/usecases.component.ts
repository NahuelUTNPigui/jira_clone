import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UseCase } from '../models/UseCase';
import { UsecaseService } from '../services/usecase.service';

@Component({
  selector: 'app-usecases',
  templateUrl: './usecases.component.html',
  styleUrls: ['./usecases.component.css']
})
export class UsecasesComponent implements OnInit {

  usecases:UseCase[]=[]
  constructor(private useCaseService:UsecaseService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getUseCases()
  }
  getUseCases(){

    
    this.useCaseService.getUseCases(Number(this.route.parent?.snapshot.paramMap.get('id')))
    .subscribe(ucs=>{
        this.usecases=ucs;
        
      })
  }
  agregar(){
    let cod_proyecto=Number(this.route.parent?.snapshot.paramMap.get('id'))
    this.router.navigateByUrl(`/detailproyecto/${cod_proyecto}/usecases/addusecase`)
    
  }

}
