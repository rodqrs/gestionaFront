import ErrorMessageModal from "../ErrorMessageModal"
import { useForm } from "react-hook-form"

import "./styles.css"

export default function SearchSeasonModal({dataCrop,handleSearchModal,handleSearch}) {

  if(typeof dataCrop === "undefined"){
        return(
          <ErrorMessageModal text="No se han cargado los datos" handleErrorModal={handleSearchModal} />
        )
      }

  const {register, handleSubmit, formState:{errors} } =useForm()

  const onSubmit= handleSubmit(
    (idData)=>{
      // const registro = dataName.find(element=>element.id===idData.nombre)
      const crop = idData.idCrop.split(",")[0]
      const nombre = idData.idCrop.split(",")[1]
      handleSearch(crop,nombre)
    } 
  )

  return(
    <div className='search-popup-bg'>
      <div className="search-season-popup">
        <header>
          <h4>Selecionar cultivo</h4>
        </header>
        <main>
          <form className="search-season-form" onSubmit={onSubmit}>
            <div>
              <label htmlFor="idCrop">Nombre Cultivo:</label>
              <select name="idCrop" {...register("idCrop",{
                    required:{value:true, message:"Este data es obligatoria"}
                  } )} >
                    {dataCrop.map((data)=>{
                      return(
                        <option value={[data.id,data.nombre]} key={data.id} >{data.nombre} </option>
                      )
                    })}
                  </select>
                  {errors.nombre && <span>{errors.nombre.message}</span>}
            </div>
            <div className='search-season-btn-bar'>
              <button className='search-season-btn-submit'>
                Buscar
              </button>
              <button className='search-season-btn-cancel' type="button" onClick={handleSearchModal}>
                Cerrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}