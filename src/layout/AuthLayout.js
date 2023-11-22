import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "../auth/hooks";
export default function AuthLayout(){
    const isLoggedIn = useIsLoggedIn()

    if(isLoggedIn === null ) return <h1> Cargando...</h1>
    else if (isLoggedIn === true) return <Navigate replace to='/'/>
    return <Outlet />
}