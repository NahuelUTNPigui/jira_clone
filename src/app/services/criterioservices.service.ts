import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Criterio } from '../models/Criterio';
@Injectable({
  providedIn: 'root'
})
export class CriterioservicesService {


  puerto=10100
  private url=`http://localhost:${this.puerto}/proyectos`
  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http:HttpClient) {
    
    
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getAPI(cod_proyecto:number,cod_verificable:number):Observable<Array<Criterio>>{
    return this.http.get<Array<Criterio>>(`${this.url}/${cod_proyecto}/usecases/${cod_verificable}/criterios`,this.httpOptions).pipe	(
      catchError(this.handleError<Array<Criterio>>("get Criterios",[]))
    )
  }
  addCriterios(cod_proyecto:number,criterios:Criterio[]){
    return this.http.post<Array<Criterio>>(`${this.url}/${cod_proyecto}/usecases/criterios`,criterios,this.httpOptions).pipe(
      catchError(this.handleError<Array<Criterio>>("add Criterios",[]))
    )
  }
}
