import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useRegister=()=>{
    const [error2,setError]=useState("");
    const [isLoading2,setisLoading]=useState<boolean>();
    const {dispatch}=useAuthContext();

    const register=async (username:string,password:string,repeatedPassword:string)=>{
        console.log(username,password);
        setisLoading(true);
        setError("");
        if(password!==repeatedPassword){
            setError("Passwords doesn't match!");
        }
        else{
            const response = await fetch("/api/register",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username,password})
            })
            const json = await response.json();
            if(!response.ok){
                setisLoading(false);
                setError(json.error);
            }
            if(response.ok){
                setisLoading(false);
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type:"LOGIN",payload:json})
            }
        }
    }
    return{register,isLoading2,error2}
}