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
          job: action.payload.job,
          name: action.payload.name,
        },
        ...state,
      };
    })
    .addCase(addCustomer, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        customer: {
          job: action.payload.job,
          name: action.payload.name,
        },
        ...state,
      };
    })
    .addCase(addTerm, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        term: action.payload,
        ...state,
      };
    })
    .addCase(addCustomer, (state, action) => {
      // localStorage.setItem("taskList", JSON.stringify([...state.taskList, action.payload]));
      return {
        place: action.payload,
        ...state,
      };
    });

  // return state;
});
