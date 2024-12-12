'use client'
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


// to check if user login or not 

export let auth = createContext(null)

export default function AuthContextProvider({children}){
    let [isLogin , setLogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem('userToken'))
            setLogin(jwtDecode(localStorage.getItem('userToken')))
    },[])
    return <auth.Provider value={{isLogin,setLogin}}>
        {children}
    </auth.Provider>
}