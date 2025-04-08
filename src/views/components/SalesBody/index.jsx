import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddButton from "../addButton";
import { formatingDate } from "../../../utils/formatingDate";
import { DeleteButton, EditButton } from "../Buttons";
import ContainerItems from "../ContainerItems";
import FilterSelect from "../FilterSelect";

import "./styles.css";

function SalesBody({
  onClickAddButton,
  crops,
  handleSelectedCrop,
  handleSelectedSeason,
  seasons,
  dataTable,
  onDeleteRow,
  onEditRow,
}) {
  const [cropsList, setCropsList] = useState([]);
  const [show, setShow] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      grow: 1,
    },
    {
      name: "Observaciones",
      selector: (row) => row.observaciones,
      grow: 3,
      wrap: true,
    },
    {
      name: "Cantidad Vendida",
      selector: (row) => row.cantidadVendida,
      grow: 2,
    },
    {
      name: "Unidad de Medida",
      selector: (row) => row.unidadMedida,
      grow: 2,
      wrap: true,
    },
    {
      name: "Precio Unitario ",
      selector: (row) => row.precioUnitario,
      grow: 2,
    },
    {
      name: "Precio Total",
      selector: (row) => row.precioTotal,
      grow: 2,
    },
    {
      name: "Fecha de Venta",
      selector: (row) => row.fechaVenta,
      cell: (row) => formatingDate(row.fechaVenta),
      grow: 2,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <EditButton title="Editar Cultivo" onClick={() => onEditRow(row)} />
          <DeleteButton
            title="Eliminar Cultivo"
            onClick={() => onDeleteRow(row)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getCropsList = () => {
      const cropsNames = crops.map((crop) => crop.nombre);
      setCropsList(cropsNames);
    };
    getCropsList();
  }, [crops]);

  const onSelectedSeason = (selectedSeason) => {
    if (!show) setShow(true);
    handleSelectedSeason(selectedSeason);
  };

  return (
    <section className="sales-body">
      <div className="sales-body__actions">
        <ContainerItems>
          <FilterSelect
            title="Cultivo"
            listOptions={cropsList}
            handleSelectedValue={handleSelectedCrop}
          />
          <FilterSelect
            title="Temporada"
            listOptions={seasons}
            handleSelectedValue={onSelectedSeason}
          />
        </ContainerItems>
        {show && (
          <AddButton
            onClick={onClickAddButton}
            iconHeight={30}
            iconWidth={30}
          />
        )}
      </div>
      {show && <DataTable columns={columns} data={dataTable} pagination />}
    </section>
  );
}

//}
export default SalesBody;
