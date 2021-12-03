import { adicionarClientes } from './../../store/actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public formCliente: FormGroup;
  public clienteSelecionado: any;

  private listaClientes$ = this.store.pipe(
    select('lista')
  );
  private listaCliente: any;
  private index: any;

  constructor(
    private builder: FormBuilder,
    private httpService: HttpService,
    private route: Router,
    private toastr: ToastrService,
    private store: Store<{lista: any}>
  ) {
    this.formCliente = this.criarFormulario();

    this.index = this.route.getCurrentNavigation()?.extras.state;

    this.selecionarCliente();
  }

  ngOnInit(){
    this.atribuirValoresAoForm(this.clienteSelecionado)
  }
  
  private criarFormulario(): FormGroup {
    return this.builder.group({
      nome: [,[Validators.required]],
      idade: [,[Validators.required]],
      cidade: [,[Validators.required]]
    })
  }

  enviarDados(){
    this.clienteSelecionado = {
      id: this.clienteSelecionado.id,
      name: this.formCliente.get('nome')?.value,
      age: this.formCliente.get('idade')?.value,
      city: this.formCliente.get('cidade')?.value,
    };

    this.httpService.put(this.clienteSelecionado)
    .subscribe(()=>{
      this.emitirAlerta()
      this.voltarPagina();
    });
  }

  atribuirValoresAoForm(dados: any){
    this.formCliente.patchValue({
      nome: dados.name,
      idade: dados.age,
      cidade: dados.city
    })
  }

  emitirAlerta(){
    this.toastr.success(
      `Cliente ${this.clienteSelecionado.name} atualizado com sucesso!`, 
      'Sucesso'
    )
  }

  selecionarCliente(){
    this.listaClientes$.pipe(
      map(dado=>{
        this.listaCliente = dado.lista;
        this.clienteSelecionado =  dado.lista[this.index.cliente]
      })
    )
    .subscribe()
  }

  voltarPagina(){
    this.route.navigate([''])
  }
}
