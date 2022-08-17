import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectos:Proyecto[]=[]
 
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
  getAPI():Observable<Array<Proyecto>>{
    return this.http.get<Array<Proyecto>>(this.url,this.httpOptions).pipe	(
      catchError(this.handleError<Array<Proyecto>>("getProyecyos",[]))
    )
  }
  getAPIid(id:number){
    return this.http.get<Proyecto>(this.url+`/${id}/proyecto`,this.httpOptions).pipe	(
      catchError(this.handleError<Proyecto>("add proyecto",{
        id,
        nombre:"",
        descripcion:"",
        temas:"",
        version:"",
        fecha_inicio:"",
        fecha_fin:""}))
    )

  }
  addAPI(proyecto:Proyecto):Observable<Proyecto>{
    let proyecto_bd=proyecto
    proyecto_bd.temas=" "+proyecto.temas.replaceAll(","," ")+" "
    return this.http.post<Proyecto>(`${this.url}`,proyecto_bd,this.httpOptions).pipe(
      catchError(this.handleError<Proyecto>('add pryecto',proyecto))
    )
  }
  getRAMp(){
    return this.proyectos
  }
  getRAMpid(id:number){
    let res=this.proyectos.filter(p=>p.id===id)
    if(res.length===0){
      return {id:-1}
    }
    else{
      return res[0]
    }
  
  }
  addRAMProyecto(proyecto:Proyecto){
    this.proyectos.push(proyecto)
  }
  modRAMp(proyecto:Proyecto){
    let p=this.getRAMpid(proyecto.id)
    if(p.id!==-1){
      p={
        id:proyecto.id,
        nombre:proyecto.nombre,
        descripcion:proyecto.descripcion,
        version:proyecto.version,
        fecha_inicio:proyecto.fecha_inicio,
        fecha_fin:proyecto.fecha_fin
      }
    }
  }
  delRAMp(id:number){
    this.proyectos.filter(p=>p.id!==id)
  }
  getRAMpNombre(nombre:string){
    return this.proyectos.filter(p=>p.nombre.toLocaleUpperCase().includes(nombre.toLocaleUpperCase()))
  }
  getProyectos():Observable<Array<Proyecto>>{
    return this.getAPI()
  }
  getProyectosNombre(nombre:string){
    return this.getRAMpNombre(nombre)
  }
  getProyecto(id:number){
    return this.getAPIid(id)
  }
  addProyecto(proyecto:Proyecto){
    return this.addAPI(proyecto)
  }
  modProyecto(proyecto:Proyecto){
    this.modRAMp(proyecto)
  }
  delProyecto(id:number){
    this.delRAMp(id)
  }
}
