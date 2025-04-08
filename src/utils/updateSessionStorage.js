import { USER_SESSION } from "./const";
import getUserData from "./getUserData";

export function addCropToProject(crop) {
  if (!crop) throw new Error("Crop object is required");
  if (typeof crop !== "object") throw new Error("Crop must be an Object");

  const userData = getUserData();
  const { projectId } = userData;
  const project = userData.projectsByUser.find(
    (project) => project.id === projectId
  );

  if (!project) throw new Error("Project not found");

  const { crops } = project;
  const newCrop = {
    id: crop.idCrop,
    nombre: crop.nombre,
    seasons: [
      {
        id: "",
        nombre: "",
      },
    ],
  };

  crops.push(newCrop);
  project.crops = crops;

  userData.projectsByUser = userData.projectsByUser.map((proj) =>
    proj.id === projectId ? project : proj
  );

  sessionStorage.setItem(USER_SESSION, JSON.stringify(userData));
}

export function deleteCropToProject(cropName) {
  if (!cropName) throw new Error("Crop Name is required");
  if (typeof cropName !== "string") throw new Error("Crop must be a string");

  const userData = getUserData();
  const { projectId } = userData;
  const project = userData.projectsByUser.find((proj) => proj.id === projectId);
  const newCrops = project.crops.filter((crop) => crop.nombre !== cropName);
  project.crops = newCrops;
  userData.projectsByUser = userData.projectsByUser.map((proj) =>
    proj.id === projectId ? project : proj
  );

  sessionStorage.setItem(USER_SESSION, JSON.stringify(userData))
}

export function addSeasonToProject(season){
  if (!season) throw new Error("Season object is required");
  if (typeof season !== "object") throw new Error("Season must be an Object");

  const userData = getUserData();
  const { projectId } = userData;
  const project = userData.projectsByUser.find(
    (project) => project.id === projectId
  );

  if (!project) throw new Error("Project not found");

  const idCrop = season.id_cultivo

  const crop = project.crops.find(
    (crop) => crop.id === idCrop
  );

  const {seasons} = crop

  const newSeason = {
    id: season.id,
    nombre: season.nombre,
  };

  seasons.push(newSeason)
  crop.seasons = seasons

  userData.projectsByUser = userData.projectsByUser.map((proj) =>
    proj.id === projectId ? project : proj
  );

  sessionStorage.setItem(USER_SESSION, JSON.stringify(userData));
}

export function deleteSeasonToProject(idSeason,idCrop) {
  if (!idSeason) throw new Error("Season id is required");
  if (typeof idSeason !== "string") throw new Error("Season must be a string");
  if (!idCrop) throw new Error("Crop id is required");
  if (typeof idCrop !== "string") throw new Error("Crop must be a string");

  try {
    
    const userData = getUserData();
    const { projectId } = userData;
    const project = userData.projectsByUser.find((proj) => proj.id === projectId);

    const posisicion = project.crops.findIndex(crop => crop.id === idCrop);

    const newSeasons = project.crops[posisicion].seasons.filter((season) => season.id !== idSeason);
    project.crops[posisicion].seasons = newSeasons;

    userData.projectsByUser = userData.projectsByUser.map((proj) =>
      proj.id === projectId ? project : proj
    );

    sessionStorage.setItem(USER_SESSION, JSON.stringify(userData))

  } catch (error) {
    console.log("Ocurrio un error eliminando del sessionStorage: "+error)
  }
  
}