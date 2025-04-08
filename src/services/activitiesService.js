import {
  API_URL,
  ACTIVITIES_PATH,
  ACTIVITIES_MANAGEMENT_PATH,
} from "../utils/const";

const activityUrl = API_URL + ACTIVITIES_PATH;
const urlActivitiesManagement = API_URL + ACTIVITIES_MANAGEMENT_PATH;

export async function getActivities() {
  try {
    const activitiesRes = await fetch(activityUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!activitiesRes.ok) throw new Error("Error fetching activities");

    const activitiesData = await activitiesRes.json();

    const newActivities = activitiesData.activities.map((activity) => {
      const {
        id: idActivity,
        nombre: name,
        descripcion: description,
        id_categoria: idCategory,
        category,
      } = activity;

      return {
        idActivity,
        name,
        description,
        idCategory,
        category: category.nombre,
        categoryDescription: category.descripcion,
      };
    });

    return newActivities;
  } catch (error) {
    console.error("There was an error retrieving the activities.", error);
  }
}

export async function getActivitiesManagement(seasonId) {
  if (!seasonId) throw new Error("Season id is required");
  if (typeof seasonId !== "string")
    throw new Error("Season id must be a string");
  const url = `${API_URL}/seasons/${seasonId}${ACTIVITIES_MANAGEMENT_PATH}`;
  try {
    const activitiesRes = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!activitiesRes.ok)
      throw new Error("Error fetching activities management");

    const activitiesData = await activitiesRes.json();

    const activitiesManagement = activitiesData.map((activity) => {
      const {
        id: idManagement,
        id_temporada: idSeason,
        id_actividad: idActivity,
        costo: cost,
        gasto_insumo_id: idSupplyExpense,
        fecha: date,
      } = activity;
      return {
        idManagement,
        idSeason,
        idActivity,
        cost,
        idSupplyExpense,
        date,
      };
    });

    return activitiesManagement;
  } catch (error) {
    console.error(
      "There was an error retrieving the activities management.",
      error
    );
  }
}

export async function createActivitiesManagement(data) {
  if (!data) throw new Error("Activities management data is required");
  if (typeof data !== "object")
    throw new Error("Activities management data must be an object");

  try {
    const activityRes = await fetch(urlActivitiesManagement, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!activityRes.ok) throw new Error("Error creating activity management");

    const activityData = await activityRes.json();

    const {
      id: idManagement,
      id_temporada: idSeason,
      id_actividad: idActivity,
      costo: cost,
      gasto_insumo_id: idSupplyExpense,
      fecha: date,
    } = activityData;

    return {
      idManagement,
      idSeason,
      idActivity,
      cost,
      idSupplyExpense,
      date,
    };
  } catch (error) {
    console.error("Failed to create the activity.", error.message);
  }
}

export async function deleteActivityManagement(idActivity) {
  if (!idActivity) throw new Error("Id activity management is requiered");
  if (typeof idActivity !== "string")
    throw new Error("Activity management id must be a string");

  const url = `${urlActivitiesManagement}/${idActivity}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error deleting activity management");

    const responsData = await response.json();

    const { id: idManagement } = responsData;
    return idManagement;
  } catch (error) {
    console.error("Failed to delete the activity", error);
  }
}

export async function updateActivityManagement(idActivity, data) {
  if (!data) throw new Error("Updated activity management data is requiered");
  if (typeof data !== "object")
    throw new Error("Updated activity management data must be an object");
  if (!idActivity)
    throw new Error("Updated activity management id is requiered");
  if (typeof idActivity !== "string")
    throw new Error("Updated activity management id must be a string");

  const url = `${urlActivitiesManagement}/${idActivity}`;

  try {
    const updatedActivityRes = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!updatedActivityRes.ok)
      throw new Error("Error updating activity management");

    const updatedActivity = await updatedActivityRes.json();
    const {
      id: idManagement,
      id_temporada: idSeason,
      id_actividad: idActivity,
      costo: cost,
      gasto_insumo_id: idSupplyExpense,
      fecha: date,
    } = updatedActivity;

    return {
      idManagement,
      idSeason,
      idActivity,
      cost,
      idSupplyExpense,
      date,
    };
  } catch (error) {
    console.error("Failed to update the activity", error);
  }
}
