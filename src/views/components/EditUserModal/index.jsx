import "./styles.css";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

const EditUserModal = forwardRef(({onClose}, ref) => {

  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };
  
  return (
    <dialog className="modal edit-user" ref={ref}>
      <button onClick={onClose} className="modal__close" autoFocus>
        <i className="modal__close--icon"></i>
      </button>
      <h2 className="edit-user__title">Editar Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-user__form">
        <label htmlFor="userName" className="form__label">Nombre Completo</label>
        <input type="text" name="userName" id="userName" className="form__input" placeholder="Ingrese el nombre completo del usuario" {
          ...register("userName", { required: "El nombre es obligatorio" })
        }/>
        {errors.userName && <p className="error-box">{errors.userName.message}</p>}

        <label htmlFor="email" className="form__label">Correo</label>
        <input type="text" name="email" id="email" className="form__input" placeholder="Ingrese el correo del usuario" {
          ...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "El correo no es válido",
            },
          })
        }/>
        {errors.email && <p className="error-box">{errors.email.message}</p>}

        <label htmlFor="rol" className="form__label">Rol</label>
        <select name="rol" id="rol" className="form__input form__select"
          {...register("rol", { required: "Selecciona un rol" })}>

          <optgroup className="form__optgroup" label="Selecciona el rol del usuario">
            <option className="form__option" value="Delegado">Delegado</option>
            <option value="Administrador">Administrador</option>
          </optgroup>
        </select>
        {errors.rol && <p className="error-box">{errors.rol.message}</p>}

        <label className="form__label">Permisos</label>
        <select name="permissions" id="permissions" className="form__input form__select"
          {...register("permissions", { required: "Selecciona un permiso" })}>

          <optgroup className="form__optgroup" label="Selecciona el permiso del usuario">
            <option className="form__option" value="Lector">Ver</option>
            <option value="Editor">Editar</option>
          </optgroup>
        </select>
        {errors.permissions && <p className="error-box">{errors.permissions.message}</p>}
        
        <div className="form__container-buttons">
          <button type="submit" className="primary-button">Guardar</button>
        </div>
      </form>
    </dialog>
  );
});

EditUserModal.displayName = "EditUserModal";

export default EditUserModal;

