import { Injectable } from '@angular/core';
import { UseCase } from '../models/UseCase';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsecaseService {
  constructor(private http:HttpClient) { }

 
  puerto=10100
  private url=`http://localhost:${this.puerto}/proyectos`
  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T>  => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 
  getUseCases(cod_proyect:number):Observable<Array<UseCase>>{
    return this.http.get<Array<UseCase>>(`${this.url}/${cod_proyect}/usecases`,this.httpOptions).pipe	(
      catchError(this.handleError<Array<UseCase>>("use cases",[]))
    )
  }
  getUseCase(cod_proyect:number,id_uc:number){
    return this.http.get<UseCase>(`${this.url}/${cod_proyect}/usecases/${id_uc}/usecase`,this.httpOptions).pipe	(
      catchError(this.handleError<UseCase>("use cases",{id:-1,nombre:"",descripcion:"",cod_proyecto:-1,cod_verificable:-1}))
    )
  }
  addUseCase(usecase:UseCase):Observable<UseCase>{
    return this.http.post<UseCase>(`${this.url}/${usecase.cod_proyecto}/usecases`,usecase,this.httpOptions).pipe	(
      catchError(this.handleError<UseCase>("use cases",{
        id:-1,
        nombre:usecase.nombre,
        descripcion:usecase.descripcion,
        cod_proyecto:usecase.cod_proyecto,
        cod_verificable:-1
      }))
    )
  }
}
