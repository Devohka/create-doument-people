import { reduser } from "./reducer";
import { productReduser} from "./productReduser"
import { configureStore } from "@reduxjs/toolkit";
import { providerReduser } from "./provider";



export const store = configureStore({
    reducer:{
      inPerson: reduser,
      product: productReduser,
      provider: providerReduser
    },
  });
