import ErrorMessageModal from '../ErrorMessageModal';
import { useForm } from 'react-hook-form';

import './styles.css';

export default function AddSeasonModal({
 handleOpenModal,
 handleAddFetch,
 idCrop,
 cropsData,
 newsData,
 completeData,
}) {
 if (
  typeof completeData === 'undefined' ||
  typeof cropsData === 'undefined' ||
  typeof newsData === 'undefined'
 ) {
  return (
   <ErrorMessageModal
    text='No se han cargado los datos'
    handleErrorModal={handleOpenModal}
   />
  );
 }

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm();

 const onSubmit = handleSubmit((data) => {
  const newData = {
   nombre: data.nombre,
   duracion: 1,
   fecha_inicio: data.inicio + 'T05:00:00.000Z',
   fecha_fin: data.inicio + 'T05:00:00.000Z',
   id_cultivo: data.idCultivo,
   novedades_id: data.idNovedades,
  };
  if (!data.idNovedades) {
   delete newData.novedades_id;
  }
  idCrop.current = data.idCultivo;
  handleAddFetch(newData);
 });

 return (
  <div className='season-popup-bg'>
   <div className='season-popup-add'>
    <header>
     <h4>Ingresar Temporada</h4>
    </header>
    <main>
     <form className='season-form-add' onSubmit={onSubmit}>
      <div>
       <label htmlFor='nombre'>Nombre</label>
       <input
        type='text'
        name='nombre'
        placeholder='Ingrese el nombre del insumo'
        {...register('nombre', {
         required: { value: true, message: 'El nombre es obligatorio' },
         minLength: {
          value: 2,
          message: 'El nombre debe tener al menos 2 caracteres',
         },
         maxLength: {
          value: 100,
          message: 'El nombre no puede tener más de 100 caracteres',
         },
        })}
       />
       {errors.nombre && <span>{errors.nombre.message}</span>}
      </div>
      <div>
       <label htmlFor='inicio'>Fecha Inicio</label>
       <input
        type='date'
        name='inicio'
        {...register('inicio', {
         required: { value: true, message: 'La fecha es obligatoria' },
        })}
       />
       {errors.inicio && <span>{errors.inicio.message}</span>}
      </div>
      <div>
       <label htmlFor='idCultivo'>Cultivo</label>
       <select
        name='idCultivo'
        {...register('idCultivo', {
         required: { value: true, message: 'Elcultivo obligatorio' },
        })}
       >
        {cropsData.map((crop) => {
         return (
          <option value={crop.id} key={crop.id}>
           {crop.nombre}{' '}
          </option>
         );
        })}
       </select>
       {errors.idCultivo && <span>{errors.idCultivo.message}</span>}
      </div>

      <div>
       <label htmlFor='idNovedades'>Novedades</label>
       <select name='idNovedades' {...register('idNovedades')}>
        <option value={null}></option>
        {newsData.map((news) => {
         return (
          <option value={news.id} key={news.id}>
           {news.nombre}{' '}
          </option>
         );
        })}
       </select>
       {errors.idNovedades && <span>{errors.idNovedades.message}</span>}
      </div>
      <div className='btn-bar'>
       <button className='btn-submit'>Comenzar</button>
       <button className='btn-cancel' type='button' onClick={handleOpenModal}>
        Cancelar
       </button>
      </div>
     </form>
    </main>
   </div>
  </div>
 );
}
