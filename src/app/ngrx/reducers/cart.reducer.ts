/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { cartAction } from '~/ngrx/actions/cart.actions';

interface CartState {
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
}

export const initialState: CartState = { total: 0, products: [] };

export const cartReducer = createReducer(
  initialState,
  on(cartAction.updateCartTotal, (state, { total }) => ({ ...state, total })),
  on(cartAction.getProductCart, (state, { products }) => ({
    ...state,
    products
  }))
);
