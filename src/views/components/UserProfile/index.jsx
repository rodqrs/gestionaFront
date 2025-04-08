import "./styles.css";
import {useForm} from "react-hook-form";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  }

  return (
    <section className="main-containter__user-profile">
      <header className="user-profile__header">
        <h1>Perfil de usuario</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="user-profile__form">
        <label htmlFor="user-fullname" className="form__label">Nombres y apellidos</label>
        <input type="text" name="user-fullname" id="user-fullname" className="form__input" defaultValue="Jhon Doe" {
          ...register("user-fullname", { required: "El nombre es obligatorio" })
        }
         />
        {errors["user-fullname"] && <p className="error-box">{errors["user-fullname"].message}</p>}

        <label htmlFor="user-email" className="form__label">Correo electrónico</label>
        <input type="email" name="user-email" id="user-email" className="form__input" defaultValue="jhon.doe@correo.com" disabled />
        <label htmlFor="user-telephone" className="form__label">Teléfono</label>

        <input type="number" name="user-telephone" id="user-telephone" className="form__input" defaultValue="9465562123" 
        {...register("numbre", {required: "El Numero de Telefono es Obligatorio"})} />
        {errors["user-telephone"] && <p className="error-box">{errors["user-telephone"].message}</p>}
      
      </form>   
      <form className="user-profile__change-password">   
        <h2 className="user-profile__subtitle">Cambiar contraseña</h2>
        <div className="user-profile__change-password">
          <div>
          <label htmlFor="current-password" className="form__label">Contraseña actual</label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                className="form__input"
                placeholder="Ingresa tu contraseña"
                {
                  ...register("current-password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres"
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
                      message: "La contraseña debe incluir al menos una mayúscula, un número y un carácter especial (!@#$%^&*)"
                    }
                  })
                }
              />
              {errors["current-password"] && (
                <p className="error-box">{errors["current-password"].message}</p>
              )}
          </div>
          <div>
          <label htmlFor="new-password" className="form__label">Nueva contraseña</label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            className="form__input"
            placeholder="Ingresa tu nueva contraseña"
            {
              ...register("new-password", {
                required: "La nueva contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La nueva contraseña debe tener al menos 8 caracteres"
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
                  message: "La nueva contraseña debe incluir al menos una mayúscula, un número y un carácter especial (!@#$%^&*)"
                }
              })
            }
          />
          {errors["new-password"] && (
            <p className="error-box">{errors["new-password"].message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirm-password" className="form__label">Confirmar contraseña</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="form__input"
            placeholder="Confirma la contraseña"
            {
              ...register("confirm-password", {
                required: "La confirmación de la contraseña es obligatoria",
                validate: (value) => value === watch("new-password") || "Las contraseñas no coinciden"
              })
            }
          />
          {errors["confirm-password"] && (
            <p className="error-box">{errors["confirm-password"].message}</p>
          )}
        </div>

        </div >
        <button type="submit" className="form__button">Guardar cambios</button>
      </form>
    </section>
  );
};

export default UserProfile;

