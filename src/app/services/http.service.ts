import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map } from 'rxjs';

import { clientePOST } from './../componentes/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  

  constructor(
    private http: HttpClient
  ) { }

  get(){
    const url = 'http://private-92a969-processoseletivo1.apiary-mock.com/customers '
    return from(this.http.get(url)).pipe(
      map(retorno=>{
        return retorno
      }),
      catchError(err => {
        console.error('catchError', err.error);
        return err;
    }),
    )
  }

  put(dados: clientePOST){
    const url = `https://private-92a969-processoseletivo1.apiary-mock.com/customers/${dados.id}/`
    return from(this.http.put(url,dados)).pipe(
      map(retorno=>{
        return retorno
      }),
      catchError(err => {
        console.error('catchError', err.error);
        return err;
    }),
    )
  }
}
