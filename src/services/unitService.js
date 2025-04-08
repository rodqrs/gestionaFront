import { API_URL, UNITS_PATH } from "../utils/const"

const unitsUrl = API_URL + UNITS_PATH

export async function fetchUnits() {
  const unitsRes = await fetch(unitsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if(!unitsRes.ok) throw new Error("Error fetching units")
  
  const unitsData = await unitsRes.json()
  return unitsData.units
}