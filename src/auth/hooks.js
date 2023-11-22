import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const useIsLoggedIn = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null)
    useEffect(() => {
        let token = sessionStorage.getItem('userToken')
        if(token == null){
            setIsLoggedIn(false)
        }else if(token != null ){
            setIsLoggedIn(true)
        }
      });
    return isLoggedIn
}