import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const url = 'http://10.44.1.81/inmuebles/pruebasJavier/CoppelInmobiliariarac/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {
  
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  private handleError(error: HttpErrorResponse) {
    debugger;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Ocurrio un error inesperado. Favor de intentarlo mas tarde..');
  };

  altasPacientes(data : any): Observable<any> {
    return this.http.post<any>(url + '/altas', data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  obtenerPaises(): Observable<any> {
    return this.http.get<any>(url + '/paises', httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  obtenerEstados(idPais : any): Observable<any>{
    return this.http.get<any>(url + '/estados/'+idPais, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  obtenerCiudades(idPais : any, idEstado : any): Observable<any>{
    return this.http.get<any>(url + '/ciudades/'+idPais+'/'+idEstado, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  consultarPacientes(): Observable<any>{
    return this.http.get<any>(url + '/pacientes', httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  consultarPaciente(idPaciente : number): Observable<any>{
    return this.http.get<any>(url + '/pacientes/'+idPaciente, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  editarPaciente(data : any): Observable<any>{
    return this.http.post<any>(url + '/editar', data, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  
}
