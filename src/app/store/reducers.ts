import { alterarCliente, adicionarClientes } from './actions';
import { createReducer, on } from "@ngrx/store";

const initialState:any = { 
  lista: [ { 
  id: '',
  name: '',
  age: '',
  city: ' '
  }]
}

export const listaReducer  = createReducer(
  initialState,
  on(adicionarClientes, (state, lista)=>(state = {...state, lista: lista.dados})),

  on(alterarCliente, (state, dados)=>(state = {...state, lista: state.lista[dados.index] = dados.usuario})),
)