import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EstadoTarea } from '../models/EstadoTarea';
@Injectable({
  providedIn: 'root'
})
export class EstadotareasService {

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
  

  getEstadosTarea(cod_proyecto:number):Observable<Array<EstadoTarea>>{
    return this.http.get<Array<EstadoTarea>>(`${this.url}/${cod_proyecto}/estados`,this.httpOptions).pipe	(
      catchError(this.handleError<Array<EstadoTarea>>("get estados",[]))
    )
  }
  addEstadoTarea(cod_proyecto:number,e_t:EstadoTarea):Observable<EstadoTarea>{
    return this.http.post<EstadoTarea>(`${this.url}/${cod_proyecto}/estados`,e_t,this.httpOptions).pipe(
      
      catchError(this.handleError<EstadoTarea>("add estado",e_t))
    )
  }
  addEstadoTareaOrdenCambiado(cod_proyecto:number,e_t:EstadoTarea):Observable<EstadoTarea>{

    return this.http.post<EstadoTarea>(`${this.url}/${cod_proyecto}/estados/addCambioOrden/${e_t.orden}`,e_t,this.httpOptions).pipe(
      
      catchError(this.handleError<EstadoTarea>("add estado",e_t))
    )

  }
  modEstadoTarea(cod_proyecto:number,e_t:EstadoTarea):Observable<EstadoTarea>{
    return this.http.put<EstadoTarea>(`${this.url}/${cod_proyecto}/estados`,e_t,this.httpOptions).pipe(
      catchError(this.handleError<EstadoTarea>("mod estado",e_t))
    )
  }
  modEstadoTareaOrdenCambiado(cod_proyecto:number,e_t:EstadoTarea,orden_anterior:number):Observable<EstadoTarea>{
    return this.http.put<EstadoTarea>(`${this.url}/${cod_proyecto}/estados/modCambioOrden/${orden_anterior}/${e_t.orden}`,e_t,this.httpOptions).pipe(
      catchError(this.handleError<EstadoTarea>("mod estado",e_t))
    )

  }
  delEstadoTarea(cod_proyecto:number,cod_orden:number):Observable<number>{
    return this.http.delete<number>(`${this.url}/${cod_proyecto}/estados/${cod_orden}`,this.httpOptions).pipe(
      catchError(this.handleError<number>("del estado",cod_orden))
    )
  }

}
