import {createContext, useReducer,useEffect, Dispatch} from "react"

type User={
    userID:number |null,
    username:string |null,
    password:string |null
}
type AuthState ={
    user:User|null
}
type Action=|{type:"LOGIN"; payload:User}|{type:"LOGOUT"};
type AuthContextType={
    user:User|null;
    dispatch:Dispatch<Action>;
}
type Props={
    children:React.ReactNode;
}
export const AuthContext= createContext<AuthContextType |null>(null);

export const authReducer = (state:AuthState,action:Action):AuthState=>{
    switch(action.type){
        case "LOGIN":
            return{user:action.payload};
        case "LOGOUT":
            return{user:null}
        default:
            return state;
    }
};

export const AuthContextProvider=({children}:Props)=>{
    const [state,dispatch]=useReducer(authReducer,{
        user:null
    })
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user')||"null");
        if(user){
            dispatch({type:"LOGIN",payload:user})
        }
    },[])

    console.log("AuthContext state:",state);
    return(
        <AuthContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}