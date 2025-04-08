import { API_URL } from "../utils/const"
const url = "http://localhost:3000/api/v1/seasons"
const urlCrops = "http://localhost:3000/api/v1/crops"
const urlNews = "http://localhost:3000/api/v1/news"

//GET ALL SEASON
export async function fetchSeasons() {
  const response = await fetch(url,{
    method: "GET", 
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  return data
}

//GET ALL BY ID CROP
export async function fetchCropSeasons(id) {
  const response = await fetch(urlCrops+"/"+id+"/seasons",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  // return data

  const newData = data.reduce((acumulador, season, index) => {
    const { nombre, duracion, fecha_inicio, fecha_fin,id,id_cultivo} = season;

    const newSeason = {
      id: index + 1,
      nombre,
      duracion,
      fecha_inicio,
      fecha_fin,
      id_season:id,
      id_cultivo,
    };
    acumulador.push(newSeason);
    return acumulador;
  }, []);

  return newData
}

//POST SEASON
export async function createSeason(season) {
  if (!season || typeof season !== "object")
    throw new Error("The SEASON must be an object");
  const response = await fetch(url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(season)
  })
  const data = await response.json()
  return data
}

//PUT SEASON
export async function editSeason(id,season) {
  if(!id || typeof id !== "string")
    throw new Error("The ID must be an string");
  if(!season || typeof season !== "object")
    throw new Error("The SEASON must be an object");
  const response = await fetch(url+"/"+id,{
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(season)
  })
  const data = response.json()
  return data
}

//DELETE SEASON
export async function deleteSeason(id){
  if(!id || typeof id !== "string")
    throw new Error("The ID must be an string");
  const response = await fetch(url+"/"+id,{
    method:"DELETE",
    headers:{
      "Content-Type": "application/json"
    }
  })
  const data = response.json()
  return data
}

//GET ALL Crops By Project
export async function fetchCrops() {
const sessionUser = sessionStorage.getItem("user_data");

  if (!sessionUser) {
    console.log("Invalid project ID"); // volver al user a la vista de projects
  }

  const { projectId } = JSON.parse(sessionUser);
  const urlC = `${urlCrops}/project/${projectId}`;

  const response = await fetch(urlC, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { crops } = await response.json();
  return crops
}
//GET ALL News
export async function fetchNews() {
  const response = await fetch(urlNews,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  return data
}