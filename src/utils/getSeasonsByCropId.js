import getUserData from "./getUserData"

export function getSeasonsByCropId (cropId){
  let userData
  try {
    userData = getUserData()
  } catch (error) {
    console.error("There was an error retrieving user data.", error)
    return null
  }
  let seasons = null

  userData.projectsByUser.map(project=>{
    const crop = project.crops.find(crop => crop.id === cropId)
    if(crop){
      seasons = crop.seasons
    }
  })

  console.log("Temporadas", seasons)
}