import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import { Link, Link as RouterLink } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const formValidations = {
    email: [(value) => value.includes("@"), "Coloca un email valido"],
    password: [
      (value) => value.length >= 6,
      "La contraseña debe tener un minimo de 6 caracteres",
    ],
  };

  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
    isFormValue,
  } = useForm(initialForm, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!emailValid === false || !passwordValid === false) return;
    startLogin({ email, password });
  };

  useEffect(() => {
    if (errorMessage != undefined) {
      Swal.fire("Error de autenticacion", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <>
      <div className="container form-container">
        <div className="row">
          <div className="col-md-12 -form">
            <h3>Ingreso</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
                <TextField
                  label="Correo"
                  type="mail"
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid}
                  helperText={emailValid}
                ></TextField>
              </div>
              <div className="form-group mb-2">
                <TextField
                  label="Contraseña"
                  type="password"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid}
                  helperText={passwordValid}
                ></TextField>
              </div>
              <div className="btn-margin form-group mb-12">
                <input
                  type="submit"
                  className="btnSubmit login-form"
                  value="Login"
                />
              </div>

              <div>
                <Grid container direction="row" justifyContent="end">
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to="/auth/register"
                  >
                    ¿No tienes cuenta?
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
