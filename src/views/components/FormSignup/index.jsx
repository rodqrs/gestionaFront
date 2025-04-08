import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { formSignupTexts } from "../../../utils/const";
import { createUser } from "../../../services/userService";

import "./styles.css";

const { fullname, email, password, createCount } = formSignupTexts;

export default function FormSignup() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const result = await createUser(data);
      if (!result.success) {
        throw new Error(result.message);
      }
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error: error creating user", error);
    }
  };

  return (
    <form className="cardform__form" onSubmit={handleSubmit(onSubmit)}>
      <label className="form__label--required" htmlFor="nombre">
        {fullname}
      </label>
      <input
        className="form__input"
        type="text"
        id="fullname"
        name="nombre"
        placeholder="Ingrese su nombre completo"
        {...register("nombre", { required: true })}
        required
      />
      <label className="form__label--required" htmlFor="email">
        {email}
      </label>
      <input
        className="form__input"
        type="email"
        id="email"
        name="email"
        placeholder="Ingrese su correo"
        {...register("email", { required: true })}
        required
      />
      <label className="form__label--required" htmlFor="password">
        {password}
      </label>
      <input
        className="form__input"
        type="password"
        id="password"
        name="password"
        placeholder="Ingrese su contraseña"
        {...register("password", { required: true })}
        required
      />
      <button className="form__button" type="submit">
        {createCount}
      </button>
    </form>
  );
}
