import { forwardRef, useEffect, useState } from "react";
import { CloseButton, PrimaryButton, SecondaryButton } from "../Buttons";
import "./styles.css";
import { useForm } from "react-hook-form";
import { formatingIsoDate } from "../../../utils/formatingDate";

const ActivitiesModal = forwardRef(
  (
    {
      onCancel,
      activities,
      activitiesList,
      onSubmit,
      modalState,
      defaulFormValues,
    },
    ref
  ) => {
    const [description, setDescription] = useState("");
    const [activity, setActivity] = useState({});
    const [selectValue, setSelectValue] = useState("");
    const { register, handleSubmit, reset } = useForm({
      defaultValues: modalState === "add" ? {} : defaulFormValues,
    });

    useEffect(() => {
      if (modalState === "add") {
        setSelectValue("");
        reset({
          date: "",
          name: "",
          description: "",
          cost: "",
        });
      } else if (modalState === "edit") {
        setSelectValue(defaulFormValues.name)
        const defaultValues = defaulFormValues
        defaultValues.date = formatingIsoDate(defaultValues.date)
        reset(defaulFormValues);
      }
    }, [defaulFormValues, modalState, reset]);

    const handleOnchange = (event) => {
      const activitySelected = event.target.value;
      const activity = activities.find(
        (activity) => activity.name === activitySelected
      );
      setSelectValue(activitySelected)
      setActivity(activity);
      setDescription(activity.description);
    };

    const handleOnSubmit = (data) => {
      const newData = { ...data, ...activity };
      newData.cost = Number(newData.cost);
      onSubmit(newData);
      onCancel();
      setDescription("");
      reset();
    };

    const handleCancel = () => {
      onCancel();
      setDescription("");
      setSelectValue("")
      reset();
    };

    return (
      <dialog className="activities-modal" ref={ref}>
        <CloseButton className={"btn-close"} onClick={handleCancel} />
        <section className="activities-modal__container">
          <h2>
            {modalState === "add" ? "Añadir Actividad" : "Editar Actividad"}
          </h2>
          <form
            className="activities-modal__form"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <label
              className="activities-modal__form__label"
              htmlFor="activities-date"
            >
              Fecha
            </label>
            <input
              className="activities-modal__form__input"
              type="date"
              name="date"
              id="activities-date"
              required
              {...register("date")}
            />
            <label
              className="activities-modal__form__label"
              htmlFor="activities-activity"
            >
              Actividad
            </label>
            <select
              className="activities-modal__form__input"
              id="activities-activity"
              name="name"
              defaultValue={""}
              value={selectValue}
              onChange={handleOnchange}
              required
            >
              <option value={""}>Seleccione una actividad</option>
              {activitiesList.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
            {/* TODO: gestionar como añadir actividades (Boton, modal con crud de actividades) */}
            {/* TODO: gestionar los insumos gastados */}
            <label
              className="activities-modal__form__label"
              htmlFor="activities-description"
              title="Descripción de la actividad"
            >
              Descripción
            </label>
            <input
              className="activities-modal__form__input"
              type="text"
              id="activities-description"
              name="description"
              value={description}
              placeholder="Descripción de la actividad"
              {...register("description")}
              readOnly
            />
            <label
              className="activities-modal__form__label"
              htmlFor="activities-cost"
              title="Costo de la actividad"
            >
              Costo
            </label>
            <input
              className="activities-modal__form__input"
              type="number"
              id="activities-cost"
              name="cost"
              placeholder="0"
              {...register("cost")}
              required
            />
            <div className="activities-modal__form__buttons">
              <PrimaryButton type={"submit"}>
                {modalState === "add" ? "Añadir Actividad" : "Editar Actividad"}
              </PrimaryButton>
              <SecondaryButton type={"button"} onClick={handleCancel}>
                Cancelar
              </SecondaryButton>
            </div>
          </form>
        </section>
      </dialog>
    );
  }
);

ActivitiesModal.displayName = "ActivitiesModal";
export default ActivitiesModal;
