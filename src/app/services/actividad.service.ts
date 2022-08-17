import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Actividad } from '../models/Actividad';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {
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
      console.error(operation+": "+error); // log to console instead
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addActvidad(cod_proyecto:number,act: Actividad){
    return this.http.post<Actividad>(`${this.url}/${cod_proyecto}/actividad`,act,this.httpOptions).pipe(
      catchError(this.handleError<Actividad>("add actividad",act))
    ) 
  }
  getActividades(cod_proyecto:number){
    return this.http.get<Array<Actividad>>(`${this.url}/${cod_proyecto}/actividad`,this.httpOptions).pipe	(
      catchError(this.handleError<Array<Actividad>>("get actividadaes",[]))
    )
  }
}
