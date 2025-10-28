import { createAction } from "@reduxjs/toolkit";

export const addInperson = createAction(
  "AddInperson",
  (nameIn, jobIn, nameCus, jobCus, basis, term, place, code) => {
    return {
      payload: {
        inPerson: {
          name: nameIn,
          job: jobIn,
        },
        customer: {
          name: nameCus,
          job: jobCus,
        },
        basis,
        term,
        place,
        code,
      },
    };
  }
);

export const addProduct = createAction("AddProduct", (name, number, cost, id) => {
  return {
    payload: {
      name,
      number,
      cost,
      id
    },
  };
});

export const Showing = createAction("Showing", (stat) => {
  return {
    payload: stat,
  };
});

export const ShowingP = createAction("Showingp", (stat) => {
  return {
    payload: stat,
  };
});

export const addProviderReduser = createAction(
  "addProviderReduser",
  ( home, code, pp, mfo, tel, ppc) => {
    return {
      payload: {
        provider: {

          home,
          code,
          pp,
          mfo,
          tel,
        },
        customer: {
          ppc,
        },
      },
    };
  }
);
