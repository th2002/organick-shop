import { createAction, props } from '@ngrx/store';

export const updateCartTotal = createAction(
  '[Cart] Update Total',
  props<{ total: number }>()
);

export const getProductCart = createAction(
  '[Cart] get products form cart',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ products: any[] }>()
);

export const cartAction = {
  updateCartTotal,
  getProductCart
};
