import ActivitiesModal from "../ActivitiesModal";
import AddButton from "../addButton";
import BackButton from "../BackButton";
import ContainerItems from "../ContainerItems";
import DataTable from "react-data-table-component";
import FilterSelect from "../FilterSelect";
import { useRef, useEffect, useState } from "react";
import { EditButton, DeleteButton } from "../Buttons";
import { formatingDate } from "../../../utils/formatingDate";
import { getCropsByProjectId } from "../../../utils/getCropsByProjectId";
import {
  createActivitiesManagement,
  deleteActivityManagement,
  getActivities,
  getActivitiesManagement,
  updateActivityManagement,
} from "../../../services/activitiesService";

import "./styles.css";

const buttonSize = 30;
const title = "REGISTRO DE ACTIVIDADES"

function ActivitiesView() {
  const [activities, setActivities] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [activitiesManagement, setActivitiesManagement] = useState([]);
  const [crops, setCrops] = useState([]);
  const [cropSelected, setCropSelected] = useState({});
  const [cropsList, setCropsList] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [modalState, setModalState] = useState("add");
  const [seasonList, setSeasonList] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState({});
  const [show, setShow] = useState(false);

  const activityModalRef = useRef();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      cell: (row) => formatingDate(row.date),
      wrap: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      wrap: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.category,
      cell: (row) => (
        <span title={row.categoryDescription}>{row.category}</span>
      ),
    },
    {
      name: "Costo",
      selector: (row) => row.cost,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <EditButton
            title="Editar Cultivo"
            onClick={() => handleEditRow(row)}
          />
          <DeleteButton
            title="Eliminar Cultivo"
            onClick={() => handleDeleteRow(row)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getActivitiesData = async () => {
      try {
        const activitiesData = await getActivities();
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching Activities Data", error);
      }
    };

    getActivitiesData();
  }, []);

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
    const getCropsList = () => {
      const cropsData = crops;
      const cropsNames = cropsData.map((crop) => crop.nombre);
      setCropsList(cropsNames);
    };
    getCropsList();
  }, [crops]);

  useEffect(() => {
    const act = activities;
    const newActivitiesList = act.map((activity) => activity.name);
    setActivitiesList(newActivitiesList);
  }, [activities]);

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
    const getActivitiesManagementData = async () => {
      if (!season) throw new Error("Season is invalid");
      setShow(true);
      try {
        const activitiesManagementData = await getActivitiesManagement(
          season.id
        );
        setActivitiesManagement(activitiesManagementData);
      } catch (error) {
        console.error("Error fetching Activities management Data", error);
      }
    };
    getActivitiesManagementData();
  }, [seasonSelected, seasons]);

  useEffect(() => {
    const actMan = activitiesManagement;
    const newDataTable = actMan.map((activityMan, index) => {
      const activity = activities.find(
        (activity) => activity.idActivity === activityMan.idActivity
      );
      return { id: index + 1, ...activityMan, ...activity };
    });
    setDataTable(newDataTable);
  }, [activitiesManagement, activities]);

  const handleSubmitForm = async (data) => {
    const season = seasons.find((s) => s.nombre === seasonSelected.nombre);
    if (!season) throw new Error("Season is invalid");
    const { idActivity, cost, date, idManagement, id } = data;
    const newData = {
      id_actividad: idActivity,
      id_temporada: season.id,
      costo: cost,
      fecha: date,
    };
    if (modalState === "add") {
      try {
        const responseData = await createActivitiesManagement(newData);
        const activity = activities.find(
          (act) => act.idActivity === responseData.idActivity
        );
        const newActivyManagement = {
          id: dataTable.length + 1,
          ...responseData,
          ...activity,
        };
        setDataTable((prevItems) => [...prevItems, newActivyManagement]);
      } catch (error) {
        console.error("error Creating activity management", error);
      }
    } else if (modalState === "edit") {
      const responseData = await updateActivityManagement(
        idManagement,
        newData
      );
      const activity = activities.find(
        (act) => act.idActivity === responseData.idActivity
      );
      const updatedActivity = {
        id,
        ...responseData,
        ...activity,
      };
      const newDataTable = dataTable.map((element) =>
        element.idManagement === updatedActivity.idManagement
          ? updatedActivity
          : element
      );
      setDataTable(newDataTable);
    }
  };
  function handleEditRow(data) {
    setModalState("edit");
    setFormValues(data);
    handleOpenModal();
  }
  async function handleDeleteRow(data) {
    const { idManagement } = data;
    try {
      const idDeleted = await deleteActivityManagement(idManagement);
      const newDataTable = dataTable.filter(
        (element) => element.idManagement !== idDeleted
      );
      setDataTable(newDataTable);
    } catch (error) {
      console.error("failed to delete activity management", error);
    }
  }
  function handleOpenModal() {
    activityModalRef.current.showModal();
  }

  return (
    <main className="activities__container">
      <header className="activities__header">
        <BackButton className={"activities__backButton"} />
        <h1>{title}</h1>
      </header>
      <section className="activities__actions">
        <ContainerItems>
          <FilterSelect
            title="Cultivo"
            listOptions={cropsList}
            handleSelectedValue={setCropSelected}
          />
          <FilterSelect
            title="Temporada"
            listOptions={seasonList}
            handleSelectedValue={setSeasonSelected}
          />
        </ContainerItems>
        {show && (
          <AddButton
            onClick={() => {
              setModalState("add");
              handleOpenModal();
            }}
            iconWidth={buttonSize}
            iconHeight={buttonSize}
          />
        )}
      </section>
      {show && <DataTable columns={columns} data={dataTable} pagination />}
      <ActivitiesModal
        ref={activityModalRef}
        onCancel={() => {
          activityModalRef.current.close();
        }}
        activities={activities}
        activitiesList={activitiesList}
        onSubmit={handleSubmitForm}
        modalState={modalState}
        defaulFormValues={formValues}
      />
    </main>
  );
}

export default ActivitiesView;
