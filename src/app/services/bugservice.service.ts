import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Criterio } from '../models/Criterio';
import { Bug } from '../models/Bug';
import { Precondicion } from '../models/Precondicion';
import { BugRecipe } from '../models/BugRecipe';
import { BugCriterioPrecondicionRecipe } from '../models/BugCriterioPrecondicionRecipe';
@Injectable({
  providedIn: 'root'
})
export class BugserviceService {
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
  addBug(cod_proyecto:number,bug:Bug,criterios:Criterio[],precondiciones:Precondicion[],bug_recipe:BugRecipe[]){
    let bcpyr:BugCriterioPrecondicionRecipe={
      bug,
      criterios,
      precondiciones,
      bug_recipe
    }
    return this.http.post<BugCriterioPrecondicionRecipe>(`${this.url}/${cod_proyecto}/bug`,bcpyr,this.httpOptions).pipe(
      catchError(this.handleError<BugCriterioPrecondicionRecipe>("add bug",bcpyr))
    )
  }
  getBugs(cod_proyecto:number){
    return this.http.get<Array<BugCriterioPrecondicionRecipe>>(`${this.url}/${cod_proyecto}/bug/all`,this.httpOptions).pipe(
      catchError(this.handleError<Array<BugCriterioPrecondicionRecipe>>("get bugs",[]))
    )
  }
}
