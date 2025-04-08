import DataTable from "react-data-table-component";

import "./styles.css";
import { formatingDate } from "../../../utils/formatingDate";
import { DeleteButton, EditButton } from "../Buttons";
import { deleteCropByName } from "../../../services/cropService";
import { deleteCropToProject } from "../../../utils/updateSessionStorage";

const CultivoTable = ({ dataTable, setDataTable, onEditRow }) => {
  const handleEdit = (row) => {
    onEditRow(row);
  };
  const handleDelete = (row) => {
    const deleteCrop = async () => {
      try {
        const response = await deleteCropByName(row.nombre);

        if (!response.success) throw new Error("Error Deleting");

        const newCrops = dataTable.filter(
          (element) => element.nombre !== row.nombre
        );

        setDataTable(newCrops);

        //Actualizar el session storage
        deleteCropToProject(row.nombre);

        console.log("Eliminado Con exito");
      } catch (error) {
        console.error("Error Deleting crop", error);
      }
    };

    deleteCrop();
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "Tipo de siembra",
      selector: (row) => row.tipo_siembra,
    },
    {
      name: "Fecha de inicio	",
      selector: (row) => row.fecha_inicio,
      cell: (row) => formatingDate(row.fecha_inicio),
    },
    {
      name: "Área del terreno	",
      selector: (row) => `${row.area_terreno} ${row.unidad}`,
      cell: (row) => (
        <div title={`${row.area_terreno} ${row.descripcion}`}>
          {row.area_terreno} {row.unidad}
        </div>
      ),
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

  return <DataTable columns={columns} data={dataTable} pagination />;
};

export default CultivoTable;
