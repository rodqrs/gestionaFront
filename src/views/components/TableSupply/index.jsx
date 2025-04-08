import DataTable from "react-data-table-component"
import { DeleteButton, EditButton } from "../Buttons";
import { formatingDate } from "../../../utils/formatingDate";

import "./styles.css"
export default function TableSupply({data, handleSelectedData,handleDeleteModal, handleEditModal, dataSearch }){
  const handleDelete = (row)=>{ 
    console.log("BORRAR",row)
    handleSelectedData(row.id_supply)
    // idCrop.current = row.id_cultivo
    handleDeleteModal()
  }
  const handleEdit= (row)=>{
    console.log("EDITAR",row)
    // idCrop.current = row.id_cultivo
    handleSelectedData(row.id_supply)
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
        width:"150px" 
      },
      {
        name: "C. Disponible",
        selector: (row) => row.cantidad_disponible,
      },
      {
        name: "Ingreso	",
        selector: (row) => row.fecha_ingreso,
        cell: (row) => formatingDate(row.fecha_ingreso),
      },
      {
        name: "Precio",
        selector: (row) => row.precio,
      },
      {
        name: "Categoria",
        selector: (row) => row.category_name,
      },
      // {
      //   name: "Unidad",
      //   selector: (row) => row.unit_name,
      // },
      {
        name: "Unidad",
        selector: (row) => row.unit_unidad,
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
        // <DataTable columns={dataColums} data={dataValues}  onSelectedRowsChange={onSelected} selectableRows/>
        <DataTable columns={columns} data={data}  pagination/>
    )
}