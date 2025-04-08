import ErrorMessageModal from "../ErrorMessageModal"

import "./styles.css"

export default function DeleteSupplyModal({handleOpenModal, handleDeleteFecth,id}) {
  if(!id){
      return(
        <ErrorMessageModal text="No ha selecionado ningun insumo" handleErrorModal={handleOpenModal} />
      )
    }
  return(
    <div className='supply-popup-bg'>
      <div className="supply-popup-delete">
        <header>
          <h4>Eliminar</h4>
        </header>
        <main>
            <p>¿Está seguro que desea eliminar este elemento?</p>
        </main>
        <footer className='supply-popup-delete-btn-bar'>
          <button className='supply-popup-delete-btn-submit' onClick={handleDeleteFecth}>
            Aceptar
          </button>
          <button className='supply-popup-delete-btn-cancel' onClick={handleOpenModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  )
}