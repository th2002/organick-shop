import { createReducer, on } from '@ngrx/store';
import { productAction } from '~/ngrx/actions/product.actions';

export const initialState = [];

export const productReducer = createReducer(
  initialState,
  on(productAction.add_product, (state): never[] => state),
  on(productAction.update_product, (state): never[] => state),
  on(productAction.delete_product, (state): never[] => state)
);
