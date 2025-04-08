import { useForm } from "react-hook-form";
import { forwardRef, useEffect, useState } from "react";
import { CloseButton, PrimaryButton, SecondaryButton } from "../Buttons";
import { fetchUnitMeasurement } from "../../../services/unitMeasurementService";
import { createSale, updateSale } from "../../../services/saleService";

import "./styles.css";

const InsertSalesModal = forwardRef(
  (
    {
      onClose,
      modalState,
      seasonsData,
      seasonSelected,
      dataTable,
      updateTable,
      defaultFormValues,
    },
    ref
  ) => {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: modalState === "add" ? {} : defaultFormValues,
    });
    const [units, setUnits] = useState([
      {
        id: "f1234567-8abc-1234-5678-defabc456789",
        nombre: "mt2",
        descripcion: "Unidad de medida para terrenos",
      },
    ]);
    useEffect(() => {
      if (modalState === "add") {
        reset({
          fecha_venta: "",
          cantidad_vendida: "",
          unidad_medida: "",
          precio_unitario: "",
          precio_total: "",
          observaciones: "",
          idSale: "",
        });
      } else {
        reset(defaultFormValues);
      }
    }, [modalState, defaultFormValues, reset]);

    useEffect(() => {
      const getUnits = async () => {
        const data = await fetchUnitMeasurement();

        setUnits(data);
      };

      getUnits();
    }, []);

    const onSubmit = async (data) => {
      if (modalState === "add") {
        const {
          fecha_venta: fechaVenta,
          cantidad_vendida: cantidadVendida,
          precio_unitario: precioUnitario,
          precio_total: precioTotal,
          observaciones,
          unidad_medida: unidadMedida,
        } = data;
        const season = seasonsData.find(
          (season) => season.nombre === seasonSelected.nombre
        );
        const unit = units.find((unit) => unit.nombre === unidadMedida);

        const newData = {
          cantidad_vendida: Number(cantidadVendida),
          precio_total: Number(precioTotal),
          fecha_venta: fechaVenta,
          id_temporada: season.id,
          observaciones,
          id_unidad_medida: unit.id,
          precio_unitario: Number(precioUnitario),
        };

        try {
          const newSale = await createSale(newData);
          const index = dataTable.length + 1;
          newSale["id"] = index;

          updateTable((prevDataTable) => [...prevDataTable, newSale]);
          reset();
          onClose();
        } catch (error) {
          console.error("error creating sale", error);
        }
      } else if (modalState === "edit") {
        const {
          idSale,
          idTemporada,
          unidad_medida: unidadMedida,
          ...newData
        } = data;
        const unit = units.find((unit) => unit.nombre === unidadMedida);
        newData["id_temporada"] = idTemporada;
        newData["id_unidad_medida"] = unit.id;
        newData["cantidad_vendida"] = Number(newData["cantidad_vendida"]);
        newData["precio_total"] = Number(newData["precio_total"]);
        newData["precio_unitario"] = Number(newData["precio_unitario"]);

        const newSale = await updateSale({ saleId: idSale, newSale: newData });
        let table = dataTable;
        table = table.map((sale) =>
          sale.idSale === idSale ? { id: sale.id, ...newSale } : sale
        );
        updateTable(table)
        reset();
        onClose();
      }
    };

    const handleCancel = () => {
      reset();
      onClose();
    };

    return (
      <dialog className="insert-modal" ref={ref}>
        <CloseButton onClick={handleCancel} className={"insert-modal__close"} />
        <h2 className="insert-modal__title">
          {modalState === "add" ? "Añadir venta" : "Editar Venta"}
        </h2>
        <form className="insert-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="insert-modal__form__inputs">
            <label
              className="insert-modal__form__label--venta"
              htmlFor="fechaVenta"
            >
              Fecha Venta
            </label>
            <input
              type="date"
              name="fecha_venta"
              id="fechaVenta"
              {...register("fecha_venta")}
            />
            <label
              className="insert-modal__form__label--cantidad"
              htmlFor="cantidadVendida"
            >
              Cantidad Vendida
            </label>
            <input
              type="number"
              name="cantidad_vendida"
              id="cantidadVendida"
              placeholder="Ingresa la cantidad vendida"
              {...register("cantidad_vendida")}
            />
            <label htmlFor="unidadMedida">Unidad de medida</label>
            <select
              name="unidad_medida"
              id="unidadMedida"
              {...register("unidad_medida")}
              defaultValue={""}
            >
              <option value={""} disabled>
                Seleccione una opción
              </option>
              {units.map((unit) => {
                return (
                  <option key={unit.id} value={unit.nombre}>
                    {unit.nombre}
                  </option>
                );
              })}
            </select>
            <label
              className="insert-modal__form__label--unitario"
              htmlFor="precioUnitario"
            >
              Precio Unitario
            </label>
            <input
              type="number"
              id="precioUnitario"
              name="precio_unitario"
              placeholder="Ingrese el valor unitario"
              {...register("precio_unitario")}
            />
            <label
              className="insert-modal__form__label--total"
              htmlFor="precioTotal"
            >
              Precio Total
            </label>
            <input
              type="number"
              id="precioTotal"
              name="precio_total"
              placeholder="Ingrese el precio total"
              {...register("precio_total")}
            />
            <label
              className="insert-modal__form__label--observaciones"
              htmlFor="observaciones"
            >
              Observaciones
            </label>
            <textarea
              rows={3}
              id="observaciones"
              name="observaciones"
              {...register("observaciones")}
            />
          </div>
          <div className="insert-modal__form--buttons">
            <SecondaryButton onClick={handleCancel} type={"button"}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton
              className={"insert-modal__form--addButton"}
              type="submit"
            >
              {modalState === "add" ? "Añadir" : "Editar"}
            </PrimaryButton>
          </div>
        </form>
      </dialog>
    );
  }
);

InsertSalesModal.displayName = "InsertSales";

export default InsertSalesModal;
