import { createReducer } from "@reduxjs/toolkit";

import {addProviderReduser, ShowingP } from "./actions";

const state = {
  show: false,
  provider: {

    home: "",
    code: "",
    pp: "",
    mfo: "",
    tel: "",
  },
  customer: {
    pp: [],
  },
};

export const providerReduser = createReducer(state, (builder) => {
  builder
    .addCase(addProviderReduser, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        show: state.show,
        provider: {

            home: action.payload.provider.home,
            code: action.payload.provider.code,
            pp: action.payload.provider.pp,
            mfo: action.payload.provider.mfo,
            tel: action.payload.provider.tel,
        },
        customer: {
            pp: [...state.customer.pp, action.payload.customer.ppc],
          }
      };
    })
    .addCase(ShowingP, (state, action) => {
      return {
        show: action.payload,
        customer: state.customer,
        provider: state.provider,
      };
    });

  // return state;
});
