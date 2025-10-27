import { createReducer } from "@reduxjs/toolkit";

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
  inperson: {
    job: "",
    name: "",
  },
  customer: {
    name: "",
    job: "",
  },
  basis: "",
  product: [
    {
      items: [],
      number: 0,
      cost: 0,
    },
  ],
  term: "",
  place: "",
};
console.log(state.taskList);
export const reduser = createReducer(state, (builder) => {
  builder
    .addCase(addInperson, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        inperson: {
          job: action.payload.inperson.job,
          name: action.payload.inperson.name,
        },
        customer: {
          name: action.payload.customer.name,
          job: action.payload.customer.job,
        },
        basis: action.payload.basis,
        product: state.product.product,
        term: action.payload.term,
        place: action.payload.place,
      };
    })

  // return state;
});
