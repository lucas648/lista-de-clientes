import { DadosCliente } from './../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-lista-de-clientes',
  templateUrl: './lista-de-clientes.component.html',
  styleUrls: ['./lista-de-clientes.component.scss']
})
export class ListaDeClientesComponent implements OnInit {

  public listaClientes: any

  public paginaAtual = 1;

  constructor(
    private httpService: HttpService,
    private route: Router
  ) { }

  ngOnInit() {
    this.httpService.get().subscribe(dados=>{
      this.listaClientes = dados;
    })
  }

  editarCliente(clienteSelecionado: DadosCliente){
    const navigationExtras: NavigationExtras = {
      state: {
        cliente: clienteSelecionado,
      },
    };
    this.route.navigate(['editar'], navigationExtras)
  }

  organizarLista(){
    this.listaClientes.sort((a:any ,b:any)=>{
      return a.idade > b.idade ? 1 : b.idade > a.idade ? -1 : 0;
    })
  }
}
