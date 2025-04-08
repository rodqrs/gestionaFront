import "./styles/sales.css";
import Sidebar from "./components/Sidebar";
import SalesHeader from "./components/SalesHeader";
import SalesBody from "./components/SalesBody";
import InsertSalesModal from "./components/insertSalesModal";
import { useRef, useEffect, useState } from "react";
import { getCropsByProjectId } from "../utils/getCropsByProjectId";
import { deleteSale, getSaleByIdSeason } from "../services/saleService";
import { formatingIsoDate } from "../utils/formatingDate";

export default function Sales() {
  const [crops, setCrops] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [cropSelected, setCropSelected] = useState({});
  const [seasonSelected, setSeasonSelected] = useState({});
  const [modalState, setModalState] = useState("add");
  const [formValues, setFormValues] = useState({});
  const [dataTable, setDataTable] = useState([]);

  const insertModalRef = useRef(null);

  useEffect(() => {
    const getCrops = () => {
      const cropsData = getCropsByProjectId();
      if (!cropsData) {
        console.error("Crops not found");
        return;
      }
      setCrops(cropsData);
    };
    getCrops();
  }, []);

  useEffect(() => {
    const crop = crops.find((c) => c.nombre === cropSelected.nombre);
    if (crop) {
      const seasonsData = crop.seasons;
      setSeasons(seasonsData);
      const listSeason = seasonsData
        .filter((season) => season.id !== "")
        .map((season) => season.nombre);
      setSeasonList(listSeason);
    }
  }, [cropSelected, crops]);

  useEffect(() => {
    const season = seasons.find((s) => s.nombre === seasonSelected.nombre);
    const getSales = async () => {
      if (!season) throw new Error("Season is invalid");

      const sales = await getSaleByIdSeason(season.id);
      setDataTable(sales);
    };
    getSales();
  }, [seasonSelected, seasons]);

  const handleOpenInsertModal = () => {
    insertModalRef.current.showModal();
  };

  const handleCloseInsertModal = () => {
    insertModalRef.current.close();
  };

  const handleDeleteRow = async (data) => {
    try {
      const sale = await deleteSale(data.idSale);
      if (!sale) throw new Error("Failed to delete the sale.");
      let table = dataTable;
      table = table.filter((element) => element.idSale !== sale.id);
      setDataTable(table);
    } catch (error) {
      console.error("Failed to delete the sale.", error);
    }
  };

  const handleEditRow = (data) => {
    const {
      cantidadVendida,
      fechaVenta,
      id,
      idSale,
      idTemporada,
      observaciones,
      precioTotal,
      precioUnitario,
      temporada,
      unidadMedida,
    } = data;

    const values = {
      fecha_venta: formatingIsoDate(fechaVenta),
      cantidad_vendida: cantidadVendida,
      unidad_medida: unidadMedida,
      precio_unitario: precioUnitario,
      precio_total: precioTotal,
      observaciones: observaciones,
      idSale,
      idTemporada,
    };

    setFormValues(values);
    setModalState("edit");

    handleOpenInsertModal();
  };

  return (
    <div className="home-view">
      <Sidebar />
      <main className="sales-container">
        <SalesHeader />
        <SalesBody
          onClickAddButton={() => {
            setModalState("add");
            handleOpenInsertModal();
          }}
          crops={crops}
          handleSelectedCrop={setCropSelected}
          handleSelectedSeason={setSeasonSelected}
          seasons={seasonList}
          dataTable={dataTable}
          onDeleteRow={handleDeleteRow}
          onEditRow={handleEditRow}
        />
      </main>
      <InsertSalesModal
        onClose={handleCloseInsertModal}
        ref={insertModalRef}
        seasonsList={seasonList}
        seasonsData={seasons}
        seasonSelected={seasonSelected}
        dataTable={dataTable}
        updateTable={setDataTable}
        modalState={modalState}
        defaultFormValues={formValues}
      />
    </div>
  );
}
