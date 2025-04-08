import "./styles.css"

export default function ErrorMessageModal({text,handleErrorModal}) {
  return(
    <div className='error-popup-bg'>
      <div className="error-popup">
        <header>
          <h4>Error</h4>
        </header>
        <main>
            <p>{text}</p>
        </main>
        <footer className='btn-bar'>
          <button className='btn-ok' onClick={handleErrorModal}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  )
}