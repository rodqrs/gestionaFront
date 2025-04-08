import { NavLink } from "react-router";

import { AuthHeader } from "./components/AuthHeader";
import { FormLogin } from "./components/FormLogin";

import "./styles/login.css";

export const Login = () => {
  return (
    <div className="view">
      <div className="container">
        <AuthHeader />
        <main className="container__cardform">
          <h1 className="cardform__title">Inicia Sesión</h1>
          <FormLogin />
          <p className="cardform__text">
            ¿No tienes una cuenta?
            <NavLink to="/signup" className="card_form__text--link">
              Registrate
            </NavLink>
          </p>
        </main>
      </div>
    </div>
  );
};
