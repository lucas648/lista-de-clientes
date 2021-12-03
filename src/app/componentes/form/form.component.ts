import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formCliente: FormGroup;
  public clienteSelecionado: any;

  constructor(
    private builder: FormBuilder,
    private httpService: HttpService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.formCliente = this.criarFormulario();

    this.clienteSelecionado = this.route.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.atribuirValoresAoForm(this.clienteSelecionado.cliente)
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
      id: this.clienteSelecionado.cliente.id,
      name: this.formCliente.get('nome')?.value,
      age: this.formCliente.get('idade')?.value,
      city: this.formCliente.get('cidade')?.value,
    };

    this.httpService.put(this.clienteSelecionado)
      .subscribe(()=>{
        this.voltarPagina(true);
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

  voltarPagina(sucesso? :boolean){
    sucesso ? this.emitirAlerta() : null;
    this.route.navigate([''])
  }
}
