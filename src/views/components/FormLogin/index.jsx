import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUser } from "../../../services/userService";
import { formLoginTexts } from "../../../utils/const";
import "./styles.css";

const { email, password, login } = formLoginTexts;

export const FormLogin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      reset();
      if (response.message === "Login successful") {
        navigate("/projects");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="cardform__form" onSubmit={handleSubmit(onSubmit)}>
      <label className="form__label--required" htmlFor="email">
        {email}
      </label>
      <input
        {...register("email", { required: true })}
        className="form__input"
        type="email"
        id="email"
        name="email"
        placeholder="Ingrese su correo"
        // required
      />
      <label className="form__label--required" htmlFor="password">
        {password}
      </label>
      <input
        {...register("password", { required: true })}
        className="form__input"
        type="password"
        id="password"
        name="password"
        placeholder="Ingrese su contraseña"
        // required
      />
      <button className="form__button" type="submit">
        {login}
      </button>
    </form>
  );
};
