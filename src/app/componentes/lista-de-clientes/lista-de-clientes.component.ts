import { DadosCliente, clientePOST } from './../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { HttpService } from './../../services/http.service';
import { select, Store } from '@ngrx/store';
import { eventosLista } from 'src/app/store/enums';
import { map, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-lista-de-clientes',
  templateUrl: './lista-de-clientes.component.html',
  styleUrls: ['./lista-de-clientes.component.scss']
})
export class ListaDeClientesComponent implements OnInit {

  private listaClientes$ = this.store.pipe(
    select('lista')
  )
  public listaClientes: any;
  public paginaAtual = 1;
  public nome: string = '';
  public idade: string = '';
  public cidade: string = '';

  constructor(
    private route: Router,
    private store: Store<{lista: any}>
  ) { }

  ngOnInit() {
    this.buscarLista()
  }

  editarCliente(clienteIndex: any){
    const navigationExtras: NavigationExtras = {
      state: {
        cliente: clienteIndex,
      },
    };
    this.route.navigate(['editar'], navigationExtras)
  }

  buscarPorNome(){
    const array = this.listaClientes.filter((p: clientePOST)=>{
      return p.name.toLocaleLowerCase().includes(this.nome.toLocaleLowerCase())
    })

    this.listaClientes = array;
    this.nome === '' ? this.buscarLista() : null;
  }

  buscarPorIdade(){
    const array = this.listaClientes.filter((p: clientePOST)=>{
      return p.age.toString().includes(this.idade)
    })

    this.listaClientes = array;
    this.idade === '' ? this.buscarLista() : null;
  }

  buscarPorCidade(){
    const array = this.listaClientes.filter((p: clientePOST)=>{
      return p.city.toLocaleLowerCase().includes(this.cidade.toLocaleLowerCase())
    })

    this.listaClientes = array;
    this.cidade === '' ? this.buscarLista() : null;
  }

  ordemAlfabetica(valor: string){
    const array = this.listaClientes.sort(function(a: any,b: any) {
      return a[valor] < b[valor] ? -1 : a[valor] > b[valor] ? 1 : 0;
    });
    this.listaClientes = array;
  }

  idadeMaiorMenor(){
    const array = this.listaClientes.sort(function(a: clientePOST,b: clientePOST) {
      return a.age > b.age ? -1 : a.age < b.age ? 1 : 0;
    });
    this.listaClientes = array;
  }


  buscarLista(){
    this.listaClientes$.subscribe(dados=>{
      this.listaClientes =  dados.lista
    })
  }
}
