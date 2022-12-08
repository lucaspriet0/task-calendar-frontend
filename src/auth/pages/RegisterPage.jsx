import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import { Link as RouterLink } from "react-router-dom"

import "./LoginPage.css";

const registerFiels = {
    name: "",
    email: "",
    password: "",
    password1: "",
}
  
export const RegisterPage = () => {

  const {startRegister, errorMessage } = useAuthStore()

  const formValidations = {
    email: [ (value) => value.includes("@") , "Coloca un email valido"],
    password: [ (value) => value.length >= 6 , "La contraseña debe tener un minimo de 6 caracteres"],
    password1: [ (value) => value.length >= 6 , "La contraseña debe tener un minimo de 6 caracteres"],
    name: [ (value) => value.length >= 2, "El nombre es obligatorio"]
  }

  const {
    
    name,  email, password, onInputChange, 
    emailValid, passwordValid, password1Valid, nameValid, password1,

  } = useForm( registerFiels, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()

    if (!emailValid === false || !passwordValid === false || !password1Valid === false) return
    if (password != password1) {
      Swal.fire("Error de autenticacion", "Las contraseñas no coinciden", "error")
      return
    }    

    startRegister({email, password, name})
  }

  useEffect(() => {
    if ( errorMessage != undefined) {
      Swal.fire("Error de autenticacion", errorMessage, "error")
    }
    
  }, [errorMessage])

  
  return (
    <>
      <div className="container form-container ">
        <div className="row">
          <div className="col-md-12 -form">
            <h3>Registro</h3>
            <form onSubmit={ onSubmit }>
              <div className="form-group mb-2">

              <TextField
                label="Nombre"
                type="text"
                placeholder="Lucas Prieto"
                fullWidth
                name="name"
                value={name}
                onChange={ onInputChange}
                error={nameValid}

                helperText={nameValid}
                >
              </TextField>
              </div>
              <div className="form-group mb-2">

              <TextField
                label="Correo"
                type="mail"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={ onInputChange}
                error={!!emailValid}
                helperText={emailValid}
                >
              </TextField>
              </div>
              <div className="form-group mb-2">

              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                name="password"
                value={password}
                onChange={ onInputChange}
                error={!!passwordValid}
                helperText={passwordValid}

                >
              </TextField>
              </div>

              <div className="form-group mb-2">

              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                name="password1"
                value={password1}
                onChange={ onInputChange}
                error={!!password1Valid}
                helperText={password1Valid}
               >
              </TextField>
              </div>

              <div className="form-group mb-2">
                <input

                  type="submit"
                  className="btnSubmit"
                  value="Crear cuenta"
                />
              </div>
              <div>

              <Grid container direction="row" justifyContent="end">
          
              <Link sx={{ pl: 0.8}}  component={ RouterLink } color="inherit" to="/auth/login" >
              ¿Ya tienes cuenta?
              </Link>
            </Grid>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
