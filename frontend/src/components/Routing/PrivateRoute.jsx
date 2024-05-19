import { useEffect,useState,useContext } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'
import Home from '../GeneralScreens/Home';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = () => {
    const bool =localStorage.getItem("authToken") ? true :false
    //const [isLoading, setIsLoading] = useState(true);
    const [auth ,setAuth] =useState(bool)
    const [error ,setError] =useState("")
    const navigate = useNavigate()
    const {setActiveUser,setConfig } = useContext(AuthContext)


    useEffect(() => {

        const controlAuth = async () => {
         const config = {
             headers: {
             "Content-Type": "application/json",
             authorization: `Bearer ${localStorage.getItem("authToken")}`,
             },
         };
         try {
             const { data } = await axios.get("http://localhost:5001/auth/private", config); 
             setAuth(true)
             setActiveUser(data.user)
             //console.log(data.user)
             setConfig(config)
             //setIsLoading(false)
             //console.log(bool)
             //console.log(config)
             //console.log(auth)
 
         } 
         catch (error) {
             //console.log("user not authorized")
             localStorage.removeItem("authToken");
 
             setAuth(false)
             setActiveUser({})
 
             navigate("/")
 
             setError("You are not authorized please login"); 
         }
         };
 
         controlAuth()
     }, [bool, navigate])
 
    return (auth ? <Outlet />  : <Home error={error} />)
}

export default PrivateRoute