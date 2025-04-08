import React, { useState } from "react";

function UpdateSales(props) {
  console.log(props);
  return (
    <div className="popup" id="modalActualizar">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="container_title">
            <div className="container_X">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.props.setIsOpen(false)}
              ></button>
            </div>

            <h5 className="title_popup" id="exampleModalLabel">
              Actualizar Venta
            </h5>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label for="lbl_venta" className="form-label">
                  Venta:
                </label>
                <fieldset disabled>
                  <input
                    type="text"
                    id="lbl_venta"
                    class="form-control"
                    placeholder=""
                  />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label for="lbl_temporada" className="form-label">
                  {" "}
                  Temporada:
                </label>
                <input
                  className="form-control"
                  list="temOptions"
                  id="lbl_temporada"
                  name="tem"
                  placeholder="Selecciona Temporada"
                />
                <datalist id="temOptions">
                  <option value="xxx"></option>
                  <option value="xxx"></option>
                  <option value="xxx"></option>
                  <option value="xxx"></option>
                  <option value="xxx"></option>
                </datalist>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <br />
                <label for="lbl_fechaVenta" className="form-label">
                  Fecha Venta:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="lbl_fechaVenta"
                  placeholder="Another input placeholder"
                  defaultValue={props.props.dato.fechaVta}
                />
              </div>
              <div className="col-md-6">
                <br />
                <label for="lbl_CantVendida" className="form-label">
                  Cantidad Vendida:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lbl_CantVendida"
                  placeholder="Ingresa la Cantidad Vendida"
                  defaultValue={props.props.dato.CanVen}
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <br />
                <label for="lbl_preciUnitario" class="form-label">
                  Precio Unitario:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lbl_preciUnitario"
                  placeholder="Ingresa el Valor Unitario"
                  defaultValue={props.props.dato.PreUni}
                />
              </div>
              <div className="col-md-6">
                <br />
                <label for="lbl_preciTotal" className="form-label">
                  Precio Total:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lbl_preciTotal"
                  placeholder="Ingresa el Precio total"
                  required
                  defaultValue={props.props.dato.PreTotal}
                />
              </div>

              <div className="row g-3">
                <div className="col-md-12">
                  <label for="lbl_observ" className="form-label">
                    Observaciones:
                  </label>
                  <textarea
                    className="form-control"
                    id="text_observacion"
                    rows="3"
                    defaultValue={props.props.dato.observaciones}
                  ></textarea>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              className="btn btn-success btn_popup"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Actualizar venta
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

export default UpdateSales;
