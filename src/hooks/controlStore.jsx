import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useConTrol = create(persist((set) => ({
  accordionID : null,
  isOpenAccordian : false,
  
  handleChangeAccordian : (id) => 
    set((state)=>({
        // isOpenAccordian : !state.isOpenAccordian 
        accordionID : state.accordionID === id ? null : id
    }))
  }
),{
    name:"control-ui"
}));
