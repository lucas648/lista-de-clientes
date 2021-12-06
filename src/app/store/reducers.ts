import { createReducer, on } from "@ngrx/store";

import { clienteLista } from './../componentes/interfaces/interfaces';
import { alterarCliente, adicionarClientes } from './actions';

const initialState: clienteLista = { 
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

  on(alterarCliente, (state, dados)=>{ 
    const lista = [...state.lista]
    lista[dados.index] = dados.usuario
    return {...state, lista: lista}
  }),
)