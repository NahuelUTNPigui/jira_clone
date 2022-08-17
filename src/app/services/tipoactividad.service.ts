import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TipoActividad } from '../models/TipoActividad';

@Injectable({
  providedIn: 'root'
})
export class TipoactividadService {

  puerto=10100
  private url=`http://localhost:${this.puerto}/proyectos`
  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http:HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getTipoActividadProyecto(cod_proyecto:number):Observable<Array<TipoActividad>>{
    return this.http.get<Array<TipoActividad>>(`${this.url}/${cod_proyecto}/tipoactividad`,this.httpOptions).pipe	(
      catchError(this.handleError<Array<TipoActividad>>("get estados",[]))
    )
  }
  addTipoActividad(cod_proyecto:number,t_p:TipoActividad):Observable<TipoActividad>{
    return this.http.post<TipoActividad>(`${this.url}/${cod_proyecto}/tipoactividad`,t_p,this.httpOptions).pipe(
      
      catchError(this.handleError<TipoActividad>("add tipoactividad",t_p))
    )
  }
  delTipoActividad(cod_proyecto:number,cod_tipo_actividad:number):Observable<number>{
    return this.http.delete<number>(`${this.url}/${cod_proyecto}/tipoactividad/${cod_tipo_actividad}`,this.httpOptions).pipe(
      catchError(this.handleError<number>("del estado",cod_tipo_actividad))
    )
  }
}
