import ErrorMessageModal from "../ErrorMessageModal"

import "./styles.css"

export default function DeleteSeasonModal({handleOpenModal, handleDeleteFecth, id}) {
  if(!id) return (<ErrorMessageModal text="No ha seleccionado ninguna temporada" handleErrorModal={handleOpenModal} />)
  return(
    <div className='season-popup-bg'>
      <div className="season-popup-delete">
        <header>
          <h4>Eliminar</h4>
        </header>
        <section>
            <p>¿Está seguro que desea eliminar este elemento?</p>
        </section>
        <footer className='season-delete-btn-bar'>
          <button className='season-delete-btn-submit' onClick={handleDeleteFecth}>
            Aceptar
          </button>
          <button className='season-delete-btn-cancel' onClick={handleOpenModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  )
}