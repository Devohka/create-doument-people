import { createAction } from "@reduxjs/toolkit";



export const addInperson = createAction("AddInperson", (name, job) => {
    return {
        payload: {
            name,
            job,

        }
    };
});

export const addCustomer = createAction("AddCustomer", (name, job) => {
    return {
        payload: {
            name,
            job,

        }
    };
});

export const addTerm = createAction("AddTerm", (term) => {
    return {
        payload: {
            term
        }
    };
});

export const addPlace = createAction("AddPlace", (place) => {
    return {
        payload: {
            place
        }
    };
});