import ErrorMessageModal from '../ErrorMessageModal'
import { useForm } from 'react-hook-form'

import './styles.css'

export default function AddSupplyModal({handleOpenModal, handleAddFetch, unitsData, categoriesData,idInventory}){

  if(unitsData.length===0 || categoriesData.length===0){
      return(
        <ErrorMessageModal text="No se han cargado los datos de unidad o categoria" handleErrorModal={handleOpenModal} />
      )
    }


  const {register, handleSubmit, formState:{errors} } =useForm() 
  
  const onSubmit= handleSubmit(
    (data)=>{
      const newData= {
                "nombre": data.nombre,
                "cantidad_disponible": parseFloat(data.cantidad),
                "fecha_ingreso": data.ingreso+"T05:00:00.000Z",
                "precio": parseFloat(data.precio),
                "id_inventario": idInventory.current,
                "id_categoria": data.idCategoria,
                "id_unidad_medida": data.idUnidad
              }
      handleAddFetch(newData)
      console.log(data)
    } 
  )

  const prueba =[
    {
      id:123,
      nombre:"pablo",
      cantidad:100
    },
    {
      id:657,
      nombre:"gillermo",
      cantidad:200
    },
    {
      id:890,
      nombre:"tyron",
      cantidad:300
    }
  ]
   

  return(
    <div className="supply-popup-bg">
      <div className="supply-popup-add">
        <header>
          <h4>
            Ingresar Insumo
          </h4>
          </header>
          <main>
            <form className="supply-form-add" onSubmit={onSubmit}>
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
                <label htmlFor="cantidad">Cantidad disp</label>
                <input type="text" name="cantidad" placeholder="Ingrese la Cantidad" {...register("cantidad",{
                  required:{value:true,message:"La cantidad es obligatoria"},
                  pattern:{value:/^[0-9]+([,][0-9]+)?$/,message:"La cantidad debe ser numerica"},
                })} />
                {errors.cantidad && <span>{errors.cantidad.message}</span>}
              </div>
              <div>
                <label htmlFor="date">F. de Ingreso</label>
                <input type="date" name="ingreso" {...register("ingreso", {
                  required:{value:true,message:"La fecha es obligatoria"},
                })} />
                {errors.ingreso && <span>{errors.ingreso.message}</span>}
              </div>
              <div>
                <label htmlFor="precio">Precio</label>
                <input type="text" name="precio" placeholder="Ingrese el precio" {...register("precio", {
                  required:{value:true,message:"El precio es obligatorio"},
                  pattern:{value:/^[0-9]+([,][0-9]+)?$/,message:"El precio debe ser numerico"},
                })} />
                {errors.precio && <span>{errors.precio.message}</span>}
              </div>
              <div>
                <label htmlFor="categoria">Categoria</label>
                <select name="categoria" {...register("idCategoria",{
                  required:{value:true, message:"La categoria es obligatoria"}
                } )} >
                  {categoriesData.map((category)=>{
                    return(
                      <option value={category.id} key={category.id} >{category.nombre} </option>
                    )
                  })}
                </select>
                {errors.idCategoria && <span>{errors.idCategoria.message}</span>}
              </div>
              <div>
                <label htmlFor="unidad">Unidad de medida</label>
                <select name="unidad" {...register("idUnidad",{
                  required:{value:true, message:"La unidad es obligatoria"}
                } )} >
                  {unitsData.units.map((unit)=>{
                    return(
                      <option value={unit.id} key={unit.id} >{unit.nombre} </option>
                    )
                  })}
                </select>
                {errors.idUnidad && <span>{errors.idUnidad.message}</span>}
              </div>
              <div className='add-supply-btn-bar'>
                <button className='btn-submit'>
                  Enviar
                </button>
                <button className='btn-cancel' type='button' onClick={handleOpenModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </main> 
      </div>
    </div>
  )
}
