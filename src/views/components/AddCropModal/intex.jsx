import { forwardRef, useEffect } from "react";
import "./styles.css";
import { CloseButton, PrimaryButton, SecondaryButton } from "../Buttons";
import { useForm } from "react-hook-form";

const AddCropModal = forwardRef(
  ({ title, onClose, onSubmit, units, defaultFormValues, modalState }, ref) => {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: modalState === "add" ? {} : defaultFormValues,
    });

    useEffect(() => {
      if (modalState === "add") {
        reset({
          nombre: "",
          tipo_siembra: "",
          fecha_inicio: "",
          area_terreno: "",
          unidad: "",
        });
      } else {
        reset(defaultFormValues);
      }
    }, [modalState, defaultFormValues, reset]);

    const handleClose = () => {
      onClose();
      reset();
    };

    const handleOnSubmit = (data) => {
      onSubmit(data);
      reset();
      onClose();
    };

    return (
      <dialog className="crop-modal" ref={ref}>
        <CloseButton className={"crop-modal__btn-close"} onClick={onClose} />
        <section className="crop-modal__container">
          <h2>{title}</h2>
          <form
            className="crop-modal__form"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <div className="crop-modal__form__inputs">
              <label className="crop-modal__form__label" htmlFor="cropName">
                Nombre del Cultivo
              </label>
              <input
                className="crop-modal__form__input"
                placeholder="Ingrese el nombre del cultivo"
                type="text"
                id="cropName"
                name="nombre"
                {...register("nombre", { required: true })}
                required
              />
              <label className="crop-modal__form__label" htmlFor="typeCrop">
                Tipo de cultivo
              </label>
              <input
                className="crop-modal__form__input"
                placeholder="ej( Café, Banano, Frijol. etc)"
                type="text"
                id="typeCrop"
                name="tipo_siembra"
                {...register("tipo_siembra", { required: true })}
                required
              />
              <label className="crop-modal__form__label" htmlFor="dateCrop">
                Fecha de inicio
              </label>
              <input
                className="crop-modal__form__input"
                type="date"
                id="dateCrop"
                name="fecha_inicio"
                {...register("fecha_inicio", { required: true })}
                required
              />
              <div className="crop-modal__form__inputs--area">
                <label
                  className="crop-modal__form__label area-label"
                  htmlFor="areaCrop"
                >
                  Area del terreno
                </label>
                <input
                  className="crop-modal__form__input"
                  placeholder="0"
                  type="number"
                  id="areaCrop"
                  name="area_terreno"
                  {...register("area_terreno", { required: true })}
                  required
                />
                <select
                  className="crop-modal__form__units"
                  name="unidad"
                  id="unit"
                  title="Selecciona la unidad de medida"
                  {...register("unidad")}
                  defaultValue={""}
                  required
                >
                  <option value="" disabled selected>
                    Elija una unidad
                  </option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.unidad}>
                      {unit.unidad}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="crop-modal__form__buttons">
              <PrimaryButton type={"submit"}>
                {modalState === "add" ? "Añadir Cultivo" : "Editar Cultivo"}
              </PrimaryButton>
              <SecondaryButton type={"button"} onClick={handleClose}>
                Cancelar
              </SecondaryButton>
            </div>
          </form>
        </section>
      </dialog>
    );
  }
);

AddCropModal.displayName = "AddCropModal";

export default AddCropModal;
