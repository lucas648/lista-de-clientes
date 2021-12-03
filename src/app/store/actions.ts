import { eventosLista } from './enums';
import { createAction, props } from '@ngrx/store';

export const adicionarClientes = createAction(
  eventosLista.adicionarLista,
  props<{dados: any}>()
)

export const alterarCliente = createAction(
  eventosLista.atualizarLista,
  props<{index: number, usuario: any}>()
)
