import DataTable from "react-data-table-component"
import { DeleteButton, EditButton } from "../Buttons";
import { formatingDate } from "../../../utils/formatingDate";

import "./styles.css"

export default function TableSeason({datos,handleSelectedData, handleEditModal, handleDeleteModal,idCrop}){
  const handleDelete = (row)=>{ 
    handleSelectedData(row.id_season)
    idCrop.current = row.id_cultivo
    handleDeleteModal()
  }
  const handleEdit= (row)=>{
    idCrop.current = row.id_cultivo
    handleSelectedData(row.id_season)
    handleEditModal()
  }
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
        name: "Duracion",
        selector: (row) => row.duracion,
      },
      {
        name: "Fecha de inicio	",
        selector: (row) => row.fecha_inicio,
        cell: (row) => formatingDate(row.fecha_inicio),
      },
      {
        name: "Fecha de final	",
        selector: (row) => row.fecha_fin,
        cell: (row) => formatingDate(row.fecha_fin),
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
    return(
        // <DataTable columns={dataColums} data={dataValues} onSelectedRowsChange={onSelected} selectableRows/>
        <DataTable columns={columns} data={datos} pagination/>
    )
}