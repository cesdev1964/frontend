import { create } from "zustand";
import api from "../api/axios";

export const useProfile = create((set)=>({
   data : {},
   isLoading:false,
   error :null,

   getProfileData : async()=>{
    set({isLoading:true,error:null});
    try{
        const response = await api.get("/api/auth/login"); 
        console.log("profile data",response.data);
        set({
            data : response.data ?? {},
            isLoading : false
        })
    }catch(error){
        set({error:error.massage,isLoading : false})
    }
   }
}))

