import { useState } from "react"
import { useAuthContext } from "./useAuthContext";


export const useLogin=()=>{
    const [error,setError]=useState<string>("");
    const [isLoading,setIsLoading]=useState<true|false>(false);
    const {dispatch} = useAuthContext();
    
    const login = async(username:string,password:string)=>{
        setIsLoading(true);
        setError("");
        const response = await fetch('/api/login',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        })
        const json =await response.json();
        console.log(json);
        console.log(response.ok);
        if(!response.ok){
            console.log(":(");
            console.log("nema tog korisnika");
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            setIsLoading(false);
            localStorage.setItem('user',JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});
        }
    }
    return {login,isLoading,error}
}