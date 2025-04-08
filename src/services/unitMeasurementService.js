import { API_URL, UNITS_PATH } from "../utils/const";

const url = API_URL + UNITS_PATH

export async function fetchUnitMeasurement() {

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()

    if(!data.success) throw new Error("Error fetching units measurement")
    
    return data.units
  } catch (error) {
    console.error("Error fetching unit measurement: ", error)
  }
}