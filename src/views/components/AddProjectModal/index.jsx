import { forwardRef } from 'react';
import { addProjecModalTexts } from '../../../utils/const';
import { CloseButton, PrimaryButton, SecondaryButton } from '../Buttons';
import { useForm } from 'react-hook-form';

import './styles.css';

const AddProjectModal = forwardRef(({ onClose, onAddElement }, ref) => {
 const { register, handleSubmit, reset } = useForm();
 const {
  cancelButtom,
  confirmButtom,
  descriptionLabel,
  inputLabel,
  placeholderInput,
  placeholderTextArea,
  title,
 } = addProjecModalTexts;

 const onSubmit = async (data) => {
  onAddElement(data);
  onClose();
  reset();
 };
 const onCancel = (event) => {
  event.preventDefault();
  onClose();
  reset();
 };

 return (
  <dialog className='project-modal' ref={ref}>
   <CloseButton className={'btn-close'} onClick={onCancel} />
   <section className='project-modal__container'>
    <h2>{title}</h2>
    <form className='project-modal__form' onSubmit={handleSubmit(onSubmit)}>
     <label className='project-modal__form__label' htmlFor='nombre'>
      {inputLabel}
     </label>
     <input
      className='project-modal__form__input'
      type='text'
      id='project_name'
      name='nombre'
      placeholder={placeholderInput}
      {...register('nombre')}
      required
     />
     <label className='project-modal__form__label' htmlFor='descripcion'>
      {descriptionLabel}
     </label>
     <textarea
      className='project-modal__form__input'
      type='text'
      id='project_name'
      name='descripcion'
      placeholder={placeholderTextArea}
      rows={4}
      {...register('descripcion')}
      required
     ></textarea>
     <div className='project-modal__form__buttons'>
      <PrimaryButton type={'Submit'}> {confirmButtom} </PrimaryButton>
      <SecondaryButton onClick={onCancel}>{cancelButtom}</SecondaryButton>
     </div>
    </form>
   </section>
  </dialog>
 );
});

AddProjectModal.displayName = 'AddProjectModal';

export default AddProjectModal;
