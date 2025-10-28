import { createReducer } from "@reduxjs/toolkit";

import { addProduct, Showing } from "./actions";

const state = {
  show: false,
  product: [],
};

export const productReduser = createReducer(state, (builder) => {
  builder
    .addCase(addProduct, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        show: state.show,
        product: [...state.product, action.payload],
      };
    })
    .addCase(Showing, (state, action) => {
      return {
        show: action.payload,
        product: [...state.product],
      };
    });

  // return state;
});
