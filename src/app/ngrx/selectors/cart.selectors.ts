/* eslint-disable @typescript-eslint/no-explicit-any */
// selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CartState {
  total: number;
  products: any[];
}

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectTotal = createSelector(
  selectCartState,
  (cartState: CartState) => cartState.total || 0
);

export const selectProductsCart = createSelector(
  selectCartState,
  (cartState: CartState) => cartState.products || []
);
