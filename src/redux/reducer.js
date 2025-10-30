import { createReducer } from "@reduxjs/toolkit";

import { addInperson, ShowingD } from "./actions";
// localStorage.clear();

// const state = {
//     taskList: JSON.parse(localStorage.getItem("taskList")),
//     activeTask: JSON.parse(localStorage.getItem("activeTask")).act,
//     tasks: "all",
//     completedTask: JSON.parse(localStorage.getItem("completed")).com,
//     active: JSON.parse(localStorage.getItem("activeTask")).num,
//     completed: JSON.parse(localStorage.getItem("completed")).numCom,
// };
// localStorage.setItem("taskList", JSON.stringify([...state.taskList]));
// localStorage.setItem("activeTask", JSON.stringify({ act: [...state.activeTask], num: state.active }));
// localStorage.setItem("completed", JSON.stringify({ com: [...state.completedTask], numCom: state.completed }));

const state = {
  showD: false,
  inperson: {
    job: "",
    name: "fg fg gf",
  },
  customer: {
    name: "gf gf gf",
    job: "",
  },
  basis: "",
  product: [],
  term: "",
  place: "",
  code: "",
};
console.log(state.taskList);
export const reduser = createReducer(state, (builder) => {
  builder
    .addCase(addInperson, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        showD: state.showD,
        inperson: {
          job: action.payload.inPerson.job,
          name: action.payload.inPerson.name,
        },
        customer: {
          name: action.payload.customer.name,
          job: action.payload.customer.job,
        },
        basis: action.payload.basis,
        product: [...state.product],
        term: action.payload.term,
        place: action.payload.place,
        code: action.payload.code,
      };
    }).addCase(ShowingD, (state, action) => {
      return {
        showD: action.payload,
        inperson: {
          job: state.inperson.job,
          name: state.inperson.name,
        },
        customer: {
          name: state.customer.name,
          job: state.customer.job,
        },
        basis: state.basis,
        product: [...state.product],
        term: state.term,
        place: state.place,
        code: state.code,
      };
    })

  // return state;
});
