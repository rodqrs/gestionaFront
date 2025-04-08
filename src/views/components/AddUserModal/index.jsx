import "./styles.css";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

const AddUserModal = forwardRef(({ onClose }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
    
  };

  return (
    <dialog className="modal add-user" ref={ref}>
      <button onClick={onClose} className="modal__close" autoFocus>
        <i className="modal__close--icon"></i>
      </button>
      <h2 className="add-user__title">Agregar un Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-user__form">
        <label htmlFor="userName" className="form__label">
          Nombre Completo
        </label>
        <input
          type="text"
          id="userName"
          className="form__input"
          placeholder="Ingrese el nombre completo del usuario"
          {...register("userName", { required: "El nombre es obligatorio" })}
        />
        {errors.userName && <p className="error-box">{errors.userName.message}</p>}

        <label htmlFor="email" className="form__label">Correo</label>
        <input
          type="text"
          id="email"
          className="form__input"
          placeholder="Ingrese el correo del usuario"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "El correo no es válido",
            },
          })}
        />
        {errors.email && <p className="error-box">{errors.email.message}</p>}

        <label htmlFor="rol" className="form__label">Rol</label>
        <select
          id="rol"
          className="form__input form__select"
          {...register("rol", { required: "Selecciona un rol" })}
        >
          <option value="">Selecciona el rol del usuario</option>
          <option value="Delegado">Delegado</option>
          <option value="Administrador">Administrador</option>
        </select>
        {errors.rol && <p className="error-box">{errors.rol.message}</p>}

        <label className="form__label">Permisos</label>
        <select
          id="permissions"
          className="form__input form__select"
          {...register("permissions", { required: "Selecciona un permiso" })}
        >
          <option value="">Selecciona el permiso del usuario</option>
          <option value="Lector">Ver</option>
          <option value="Editor">Editar</option>
        </select>
        {errors.permissions && <p className="error-box">{errors.permissions.message}</p>}

        <div className="form__container-buttons">
          <button type="submit" className="primary-button">Agregar Usuario</button>
        </div>
      </form>
    </dialog>
  );
});

AddUserModal.displayName = "AddUserModal";

export default AddUserModal;
