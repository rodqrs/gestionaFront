import TitleSection from "./components/TitleSection";
import Sidebar from "./components/Sidebar";
import AddSupplyModal from "./components/AddSupplyModal";
import EditSupplyModal from "./components/EditSupplyModal";
import DeleteSupplyModal from "./components/DeleteSupplyModal";
import SearchSupplyModal from "./components/SearchSupplyModal";
import SuppliesBody from "./components/SuppliesBody";
import {
  createSupply,
  editSupply,
  deleteSupply,
  fetchUnits,
  fetchCategories,
  fetchSuppliesByInventoryID,
  fetchInventoriesByProjectoID,
  postInventory,
} from "../services/supplyService";
import { useState, useEffect, useRef } from "react";

import "./styles/supply.css";

export default function Supply() {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState(null);
  const [unitsData, setUnitsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [inventoryProjectData, setInventoryProjectData] = useState(false);
  const id = useRef(null);
  const idInventory = useRef(null);
  const hasPosted = useRef(false);

  useEffect(() => {
    fetchDataInventoriesByProject();
    fetchDataUnits();
    fetchDataCategories();
  }, []);

  useEffect(() => {
    if (inventoryProjectData.length === 0 && !hasPosted.current) {
      console.log("ENTRO");
      hasPosted.current = true;
      addInventory();
    }
  }, [inventoryProjectData]);

  async function fetchDataByInventory(id) {
    try {
      const result = await fetchSuppliesByInventoryID(id);
      idInventory.current = id;
      setData(result);
    } catch (error) {
      console.error("Error fetching supplies data(F):", error);
    }
  }

  async function fetchDataInventoriesByProject() {
    try {
      const result = await fetchInventoriesByProjectoID();
      setInventoryProjectData(result);
      return result;
    } catch (error) {
      console.error("Error fetching supplies data(F):", error);
    }
  }

  async function addInventory() {
    try {
      const result = await postInventory();
      fetchDataInventoriesByProject();
    } catch (error) {
      console.error("Error fetching supplies data(F):", error);
    }
  }

  async function fetchDataUnits() {
    try {
      const result = await fetchUnits();
      setUnitsData(result);
    } catch (error) {
      console.error("Error fetching units data(F):", error);
    }
  }

  async function fetchDataCategories() {
    try {
      const result = await fetchCategories();
      setCategoriesData(result);
    } catch (error) {
      console.error("Error fetching categories data(F):", error);
    }
  }

  const handleAddModal = () => {
    setAdd(!add);
  };

  const handleEditModal = () => {
    setEdit(!edit);
  };

  const handleDeletesModal = () => {
    setDeletes(!deletes);
  };

  const handleSearchModal = () => {
    setSearch(!search);
  };

  const handleSelectedData = (param) => {
    id.current = param;
  };

  const handleAddFetch = async (supply) => {
    const result = await createSupply(supply);
    console.log(result);
    fetchDataByInventory(idInventory.current);
    handleAddModal();
  };

  const handleEditFetch = async (supply) => {
    const result = await editSupply(id.current, supply);
    fetchDataByInventory(idInventory.current);
    handleEditModal();
    console.log(result);
  };

  const handleDeleteFecth = async () => {
    await deleteSupply(id.current);
    fetchDataByInventory(idInventory.current);
    handleDeletesModal();
    id.current = null;
  };

  const handleSearch = (registerSearch) => {
    setDataSearch(registerSearch);
    handleSearchModal();
  };

  const handleDelete = (row) => {
    handleSelectedData(row.id_supply);
    handleDeletesModal();
  };
  const handleEdit = (row) => {
    handleSelectedData(row.id_supply);
    handleEditModal();
  };

  return (
    <div className="supply-view">
      <Sidebar />
      <main className="supply-main-view">
        <TitleSection title="INVENTARIO DE INSUMOS" />

        <SuppliesBody
          handleAddModal={handleAddModal}
          handleSelectedInventory={fetchDataByInventory}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          inventories={inventoryProjectData}
          dataTable={data}
        />

        {add && (
          <AddSupplyModal
            handleOpenModal={handleAddModal}
            handleAddFetch={handleAddFetch}
            unitsData={unitsData}
            categoriesData={categoriesData}
            data={data}
            idInventory={idInventory}
          />
        )}

        {edit && (
          <EditSupplyModal
            handleEditModal={handleEditModal}
            id={id.current}
            completeData={data}
            handleEditFetch={handleEditFetch}
            unitsData={unitsData}
            categoriesData={categoriesData}
            idInventory={idInventory}
          />
        )}

        {deletes && (
          <DeleteSupplyModal
            handleOpenModal={handleDeletesModal}
            handleDeleteFecth={handleDeleteFecth}
            id={id.current}
          />
        )}

        {search && (
          <SearchSupplyModal
            dataName={data}
            handleSearchModal={handleSearchModal}
            handleSearch={handleSearch}
            data={data}
          />
        )}
      </main>
    </div>
  );
}
