import './styles/crop.css';
import Sidebar from './components/Sidebar';
import CropHeader from './components/CropHeader';
import CultivoTable from './components/CultivoTable';
import { useEffect, useRef, useState } from 'react';
import { createCrop, fetchCrops, updateCrop } from '../services/cropService';
import AddButton from './components/addButton';
import AddCropModal from './components/AddCropModal/intex';
import { fetchUnits } from '../services/unitService';
import { addCropToProject } from '../utils/updateSessionStorage';
import { formatingIsoDate } from '../utils/formatingDate';

export default function Crop() {
 const [crops, setCrops] = useState([]);
 const [units, setUnits] = useState([]);
 const [modalAction, setModalAction] = useState('add');
 const [formValues, setFormValues] = useState({});

 const cropModalRef = useRef(null);

 const buttonSize = 30;

 useEffect(() => {
  const getCrops = async () => {
   const data = await fetchCrops();
   setCrops(data);
  };

  const getUnits = async () => {
   try {
    const unitsData = await fetchUnits();
    setUnits(unitsData);
   } catch (error) {
    console.error('Error fetch units', error);
   }
  };

  getUnits();
  getCrops();
 }, []);

 const handleOpenModal = (ref) => {
  ref.current.showModal();
 };
 const handleCloseModal = (ref) => {
  ref.current.close();
 };
 const handleSubmitModal = async (data) => {
  const { unidad, ...newCrop } = data;

  const unit = units.find((unit) => unit.unidad === unidad);
  newCrop['id_unidad_medida'] = unit.id;

  try {
   let response;
   if (modalAction === 'add') {
    response = await createCrop(newCrop);
    response.id = crops.length + 1;
    setCrops((prevCrops) => [...prevCrops, response]);
    addCropToProject(response);
   } else if (modalAction === 'edit') {
    const updatedCrop = await updateCrop({
     oldData: formValues,
     newData: newCrop,
    });
    const oldName = formValues.nombre;

    let newCrops = crops;
    newCrops = newCrops.map((crop) =>
     crop.nombre === oldName ? { id: crop.id, ...updatedCrop } : crop
    );

    setCrops(newCrops);
   }
  } catch (error) {
   console.error('Error Creating Crop', error);
  }
 };

 const handleEditRow = (data) => {
  const { fecha_inicio, ...newData } = data;
  const initialDate = formatingIsoDate(fecha_inicio);
  newData['fecha_inicio'] = initialDate;

  setModalAction('edit');
  setFormValues(newData);
  handleOpenModal(cropModalRef);
 };

 return (
  <div className='crop__home-view'>
   <Sidebar />
   <main className='crop-container'>
    <CropHeader />
    <section className='crop__content'>
     <div className='crop__content__actions'>
      <AddButton
       onClick={() => {
        setFormValues({});
        setModalAction('add');
        handleOpenModal(cropModalRef);
       }}
       iconWidth={buttonSize}
       iconHeight={buttonSize}
      />
     </div>
     <CultivoTable
      dataTable={crops}
      setDataTable={setCrops}
      onEditRow={handleEditRow}
     />
     <AddCropModal
      ref={cropModalRef}
      onSubmit={handleSubmitModal}
      onClose={() => handleCloseModal(cropModalRef)}
      title={modalAction === 'add' ? 'Añadir Cultivo' : 'Editar Cultivo'}
      units={units}
      defaultFormValues={formValues}
      modalState={modalAction}
     />
    </section>
   </main>
  </div>
 );
}
