import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "../auth/hooks";
import Navbar from "../components/Navbar";
export default function Layout(){
    const isLoggedIn = useIsLoggedIn()

    if(isLoggedIn === null ) return <h1> Cargando...</h1>
    else if (isLoggedIn === false) return <Navigate replace to='/login'/>
    return <Navbar children={<Outlet />}/> 
}