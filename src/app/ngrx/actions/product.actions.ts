import { createAction } from '@ngrx/store';

const add_product = createAction('[Product Component] ADD PRODUCT');
const update_product = createAction('[Product Component] UPDATE PRODUCT');
const delete_product = createAction('[Product Component] DELETE PRODUCT');

export const productAction = {
  add_product,
  update_product,
  delete_product
};
