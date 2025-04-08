import ErrorMessageModal from '../ErrorMessageModal'
import { useForm} from 'react-hook-form'
import { useEffect } from 'react'

import './styles.css'

export default function EditSeasonModal({handleEditModal,handleEditFetch,id,completeData,cropsData,newsData,idCrop}){
  // SI NO SE SELECCIONADO UN REGISTRO RETORNO ESTE MENSAJE
    if(!id){
      return(
        <ErrorMessageModal text="No ha selecionado ninguna temporada" handleErrorModal={handleEditModal} />
      )
    }

  const {register, handleSubmit, formState:{errors},setValue} =useForm() 

  //SE TOMAN LOS DATOS DEL SEASON SELECIONADO
  // console.log()
  const dataValue = completeData.find((value)=>value.id_season === id)

  //PONER LOS DATOS POR DEFECTO EN LOS INPUTS
  useEffect(()=>{
      setValue("nombre",dataValue.nombre)
      setValue("inicio",dataValue.fecha_inicio.split("T")[0])
      setValue("idCultivo",dataValue.id_cultivo)
      setValue("idNovedades",dataValue.novedades_id)
    },[])

  //CUANDO EDITE LA TEMPORADA
  const onSubmit= handleSubmit(
    (data)=>{
      const newData= {
                "nombre": data.nombre,
                "duracion": 1,
                "fecha_inicio": data.inicio+"T00:00:00.000Z",
                "fecha_fin": data.inicio+"T00:00:00.000Z",
                "id_cultivo": data.idCultivo,
                "novedades_id": data.idNovedades
              }
      if(!data.idNovedades){
        delete newData.novedades_id
      }
      const oldCrop = idCrop.current
      idCrop.current = data.idCultivo
      handleEditFetch(newData,oldCrop)
    } 
  )

  //CUANDO TERMINE LA TEMPORADA
  const onSubmit2= handleSubmit(
    (data)=>{
      const date = new Date()
      const year = String( date.getFullYear())
      const month =String(date.getMonth()+1).padStart(2,"0") 
      const day =String(date.getDate()).padStart(2,"0") 
      const date1 = new Date(data.inicio+"T00:00:00"); // Fecha inicial
      const date2 = new Date(`${year}-${month}-${day}T00:00:00`); // Fecha final
      const difference = (date2.getTime() - date1.getTime())/ (1000*60*60*24); //Diferencia en dias
      const newData= {
                "nombre": data.nombre,
                "duracion": difference,
                "fecha_inicio": data.inicio+"T00:00:00.000Z",
                "fecha_fin": `${year}-${month}-${day}T00:00:00.000Z`,
                "id_cultivo": data.idCultivo,
                "novedades_id": data.idNovedades
              }
      if(!data.idNovedades){
        delete newData.novedades_id
      }
      const oldCrop = idCrop.current
      idCrop.current = data.idCultivo
      handleEditFetch(newData,oldCrop)
    } 
  )

  return(
    <div className='season-popup-bg'>
      <div className="season-popup-edit">
        <header>
          <h4>
            Editar Temporada
          </h4>
          </header>
          <main>
            <form className='season-form-edit' onSubmit={onSubmit}>
              <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" placeholder="Ingrese el nombre del insumo" {...register("nombre",{
                  required:{value:true,message:"El nombre es obligatorio"},
                  minLength:{value:2,message:"El nombre debe tener al menos 2 caracteres"},
                  maxLength:{value:100,message:"El nombre no puede tener más de 100 caracteres"},
                })} />
                {errors.nombre && <span>{errors.nombre.message}</span>}
              </div>
              <div>
                <label htmlFor="inicio">Fecha Inicio</label>
                <input type="date" name="inicio"  {...register("inicio", {
                  required:{value:true,message:"La fecha es obligatoria"},
                })} />
                {errors.inicio && <span>{errors.inicio.message}</span>}
              </div>
              <div>
                <label htmlFor="idCultivo">ID Cultivo</label>
                <select name="idCultivo" {...register("idCultivo",{
                  required:{value:true, message:"Elcultivo obligatorio"}
                } )} >
                  {cropsData.map((crop)=>{
                    return(
                      <option value={crop.id} key={crop.id} >{crop.nombre} </option>
                    )
                  })}
                </select>
                {errors.idCultivo && <span>{errors.idCultivo.message}</span>}
              </div>

              <div>
                <label htmlFor="idNovedades">ID Novedades</label>
                <select name="idNovedades" {...register("idNovedades")} >
                  <option value={null}></option>
                  {newsData.map((news)=>{
                    return(
                      <option value={news.id} key={news.id} >{news.nombre} </option>
                    )
                  })}
                </select>
                {errors.idNovedades && <span>{errors.idNovedades.message}</span>}
              </div>
              <div className='btn-bar'>
                <div className='btn-1'>
                  <button className='btn-end' type='button' onClick={onSubmit2}>
                    FINALIZAR
                  </button>
                </div>
                <div className='btn-2'>
                  <button className='btn-submit'>
                    Editar
                  </button>
                  <button className='btn-cancel' type='button' onClick={handleEditModal}>
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </main> 
      </div>
    </div> 
  )
}