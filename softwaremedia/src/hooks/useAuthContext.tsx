import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw Error("There has been error with context");
    }
    return context;
}