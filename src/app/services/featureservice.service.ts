import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Feature } from '../models/Feature';
import { Criterio } from '../models/Criterio';
import { FeatureCriterios } from '../models/FeatureCriterios';
@Injectable({
  providedIn: 'root'
})
export class FeatureserviceService {
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
  addFeature(cod_proyecto:number, f:Feature,criterios:Criterio[]){
    let fyc:FeatureCriterios={
      feature:f,
      criterios
    }
    return this.http.post<FeatureCriterios>(`${this.url}/${cod_proyecto}/feature`,fyc,this.httpOptions).pipe(
      catchError(this.handleError<FeatureCriterios>("add feauture",fyc))
    ) 
  }
  getFeatures(cod_proyecto:number):Observable<Array<Feature>>{
    return this.http.get<Array<Feature>>(`${this.url}/${cod_proyecto}/actividad`,this.httpOptions).pipe	(
      catchError(this.handleError<Array<Feature>>("get features",[]))
    )
  }
}
