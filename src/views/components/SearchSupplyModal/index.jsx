import ErrorMessageModal from "../ErrorMessageModal"
import { useForm } from "react-hook-form"

import "./styles.css"

export default function SearchSupplyModal({dataName,handleSearchModal,handleSearch}) {

  if(dataName.length===0){
        return(
          <ErrorMessageModal text="No se han cargado los datos" handleErrorModal={handleSearchModal} />
        )
      }

  const {register, handleSubmit, formState:{errors} } =useForm()

  const onSubmit= handleSubmit(
    (idData)=>{
      const registro = dataName.find(element=>element.id===idData.nombre)
      handleSearch(registro)
    } 
  )

  return(
    <div className='search-popup-bg'>
      <div className="search-supply-popup">
        <header>
          <h4>Buscar</h4>
        </header>
        <main>
          <form className="search-supply-form" onSubmit={onSubmit}>
            <div>
              <label htmlFor="nombre">Nombre Insumo:</label>
              <select name="nombre" {...register("nombre",{
                    required:{value:true, message:"Este data es obligatoria"}
                  } )} >
                    {dataName.map((data)=>{
                      return(
                        <option value={data.id} key={data.id} >{data.nombre} </option>
                      )
                    })}
                  </select>
                  {errors.nombre && <span>{errors.nombre.message}</span>}
            </div>
            <div className='search-supply-btn-bar'>
              <button className='search-supply-btn-submit'>
                Buscar
              </button>
              <button className='search-supply-btn-cancel' type="button" onClick={handleSearchModal}>
                Cerrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}