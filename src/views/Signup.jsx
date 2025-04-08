import { NavLink } from "react-router";
import { AuthHeader } from "./components/AuthHeader";
import FormSignup from "./components/FormSignup";

import "./styles/login.css";

export default function Signup() {
  const title="Crea tu cuenta"
  const message = "¿Ya tienes una cuenta?"
  const linkMessage = "Inicia Sesión"
  return (
    <div className="view">
      <div className="container">
        <AuthHeader />
        <main className="container__cardform">
          <h1 className="cardform__title">{title}</h1>
          <FormSignup />
          <p className="cardform__text">
            {message}
            <NavLink to="/" className="card_form__text--link">
              {linkMessage}
            </NavLink>
          </p>
        </main>
      </div>
    </div>
  );
}
