import { HttpService } from './services/http.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { eventosLista } from './store/enums';
import { adicionarClientes } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listaClientes';

  constructor(
    private store: Store<{lista: eventosLista}>,
    private httpService: HttpService
  ){
    this.httpService.get().subscribe(retorno=>{
      this.store.dispatch(adicionarClientes({dados: retorno}))
    })
  }
}
