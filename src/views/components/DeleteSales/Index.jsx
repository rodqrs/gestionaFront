import React, { useState } from "react";

function DeleteSales(props) {
  return (
    <div className="popup" id="modalDelete">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="container_title">
          <div className="container_X">
          <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.props.setIsOpen(false)}></button>	
          </div>
            <h5 className="title_popup" id="exampleModalLabel">
              Confirmación
            </h5>
          </div>
     
          <div className="modal-body">
            ¿Estás Seguro Que Deseas Eliminar El Registro?
          </div>
          <br />
          <div className="modal-footer">

          <button
              type="button"
              className="btn btn-success btn_popup"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Eliminar
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => props.props.setIsOpen(false)}
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSales;
