import getUserData from "./getUserData"

export function getCropsByProjectId(){
  let userData 
  try {
    userData = getUserData()
  } catch (error) {
    console.error("There was an error retrieving user data.", error)
    return null
  }
  const project = userData.projectsByUser.find(proj => proj.id === userData.projectId)

  return project.crops

}