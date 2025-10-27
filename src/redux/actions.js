import { createAction } from "@reduxjs/toolkit";

export const addInperson = createAction("AddInperson", 
(nameIn, jobIn, nameCus, jobCus, basis, term, place) => {
  return {
    payload: {
      inperson: {
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
    },
  };
});
