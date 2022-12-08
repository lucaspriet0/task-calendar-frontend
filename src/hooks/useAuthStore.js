import { useDispatch, useSelector } from "react-redux";
import { calendarAPI } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/authSlice/authSlice";
import { onLogoutCalendar } from "../store/calendar/calnedarSlice";

export const useAuthStore = () => {

  const { user, errorMessage, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ( { email, password } ) => {

    dispatch(onChecking());

    try {

      const {data} = await calendarAPI.post("/auth", {email, password })
    
      localStorage.setItem("token", data.token)
      localStorage.setItem("token-init-date", new Date().getTime())
      dispatch(onLogin( {name: data.name, uid: data.uid} ))
      
    } catch (error) {

      console.log({error})

      dispatch(onLogout(error.response.data?.msg))
      
      setTimeout(() => {
        dispatch( clearErrorMessage())
      }, 1000);
      
    }
  };

  const startRegister = async ({name, password, email }) => {

    dispatch(onChecking());

    try {

      const { data } = await calendarAPI.post("/auth/registro", { email, password,name});

      localStorage.setItem("token", data.token)
      localStorage.setItem("token-init-date", new Date().getTime())
      dispatch( onLogin({name: data.name, uid: data.uid}))

    } catch (error) {
      
      dispatch( onLogout(error.response.data?.msg|| "Contraseña erronea"))
      setTimeout(() => {
        dispatch( clearErrorMessage())
      }, 1000);
    }
  }

  const startCheckAuthToken =  async () => {

    const token = localStorage.getItem("token")
    if (!token) return dispatch(onLogout())

    try {

      const {data} = await calendarAPI.get("/auth/renew")
      localStorage.setItem("token", data.token)
      localStorage.setItem("token-init-date", new Date().getTime())
      dispatch( onLogin({name: data.name, uid: data.uid}))

      
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }

  } 

  const starLogout = () => {

    localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout())
   
  }

  return {
    //Propiedades
    user,
    errorMessage,
    status,

    //Metodos
    startLogin,
    startRegister,
    checkAuthToken: startCheckAuthToken,
    starLogout,
  };
};
