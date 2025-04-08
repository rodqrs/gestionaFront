import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddButton from "../addButton";
import { formatingDate } from "../../../utils/formatingDate";
import { DeleteButton, EditButton } from "../Buttons";
import ContainerItems from "../ContainerItems";
import FilterSelect2 from "../FilterSelect2";

import "./styles.css";

function SuppliesBody({
  handleAddModal,
  handleSelectedInventory,
  inventories,
  dataTable,
  handleDelete,
  handleEdit
}) {
  const [show, setShow] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      grow:1,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      grow:3,
      wrap:true,
    },
    {
      name: "C. Disponible",
      selector: (row) => row.cantidad_disponible,
      grow:2,
    },
    {
      name: "Ingreso	",
      selector: (row) => row.fecha_ingreso,
      cell: (row) => formatingDate(row.fecha_ingreso),
      grow:2,
    },
    {
      name: "Precio",
      selector: (row) => row.precio,
      grow:2,
    },
    {
      name: "Categoria",
      selector: (row) => row.category_name,
      grow:2,
      wrap:true,
    },
    {
      name: "Unidad",
      selector: (row) => row.unit_unidad,
      grow:2,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <EditButton title="Editar Cultivo" onClick={() => handleEdit(row)} />
          <DeleteButton
            title="Eliminar Cultivo"
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];

  const onSelectedSeason = async (selectedSeason) => {
    await handleSelectedInventory(selectedSeason.id);
    if (!show) setShow(true);
  };

  return (
    <main className="sales-body">
      <div className="sales-body__actions">
        <ContainerItems>
          <FilterSelect2
            title="INVENTARIO"
            listOptions={inventories}
            handleSelectedValue={onSelectedSeason}
          />
        </ContainerItems>
        {show && (
          <AddButton
            onClick={handleAddModal}
            iconHeight={30}
            iconWidth={30}
          />
        )}
      </div>
      {show && <DataTable columns={columns} data={dataTable} pagination />}
    </main>
  );
}

//}
export default SuppliesBody;