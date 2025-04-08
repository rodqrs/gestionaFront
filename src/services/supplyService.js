import getUserData from "../utils/getUserData";

const URL = "http://localhost:3000/api/v1/supplies"
const URL_UNITS = "http://localhost:3000/api/v1/units"
const URL_CATEGORIES = "http://localhost:3000/api/v1/categories"
const URL_INVENTORIES = "http://localhost:3000/api/v1/inventories"
const URL_INVENTORY = "http://localhost:3000/api/v1/inventory/"
const URL_PROJECT = "http://localhost:3000/api/v1/project/"

//GET ALL SUPLLIES
export async function fetchSupplies() {
  const response = await fetch(URL,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const {data} = await response.json()

  const unidades = await fetchUnits()
  const categories = await fetchCategories()

  const newData =data.map((supply,index) => {
    const dataUnit = unidades.units.find((unit)=> unit.id === supply.id_unidad_medida)
    const dataCategory = categories.find((category)=> category.id === supply.id_categoria)
    
    return {
      id: index+1,
      id_supply: supply.id,
      nombre: supply.nombre,
      cantidad_disponible: supply.cantidad_disponible,
      fecha_ingreso: supply.fecha_ingreso,
      precio: supply.precio,
      category_name:dataCategory.nombre,
      unit_name:dataUnit.nombre,
      unit_unidad:dataUnit.unidad,
      id_categoria: supply.id_categoria,
      id_unidad_medida: supply.id_unidad_medida,
      id_inventario: supply.id_inventario,
    }
  })
  return newData
}
export async function fetchSuppliesByInventoryID(id) {
  if(!id || typeof id !== "string")
    throw new Error("The ID must be an string");
  const response = await fetch(URL_INVENTORY+id+"/supplies",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const {supplies} = await response.json()

  const unidades = await fetchUnits()
  const categories = await fetchCategories()

  const newData =supplies.map((supply,index) => {
    const dataUnit = unidades.units.find((unit)=> unit.id === supply.id_unidad_medida)
    const dataCategory = categories.find((category)=> category.id === supply.id_categoria)
    
    return {
      id: index+1,
      id_supply: supply.id,
      nombre: supply.nombre,
      cantidad_disponible: supply.cantidad_disponible,
      fecha_ingreso: supply.fecha_ingreso,
      precio: supply.precio,
      category_name:dataCategory.nombre,
      unit_name:dataUnit.nombre,
      unit_unidad:dataUnit.unidad,
      id_categoria: supply.id_categoria,
      id_unidad_medida: supply.id_unidad_medida,
      id_inventario: supply.id_inventario,
    }
  })
  return newData
}

//POST SUPPLY
export async function createSupply(supply){
  if (!supply || typeof supply !== "object")
    throw new Error("The SUPPLY must be an object");
  const response = await fetch(URL,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(supply),
  })
  const data = await response.json();
  return data;
}

//PUT SUPPLY
export async function editSupply(id,supply) {
  if(!id || typeof id !== "string")
    throw new Error("The ID must be an string");
  if(!id || typeof supply !== "object")
    throw new Error("The SUPPLY must be an object");
  const response = await fetch(URL+"/"+id,{
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(supply)
  })
  const data = await response.json()
  return data
}

//DELETE SUPPLY
export async function deleteSupply(id) {
  if(!id || typeof id !== "string")
    throw new Error("The ID must be an string");
  const response = await fetch(URL+"/"+id,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json();
  return data
}

//GET ALL UNITS
export async function fetchUnits() {
  const response = await fetch(URL_UNITS,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  return data
}

//GET ALL CATEGORIES
export async function fetchCategories() {
  const response = await fetch(URL_CATEGORIES,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  return data
}

//GET ALL INVENTORIES
export async function fetchInventories() {
  const response = await fetch(URL_INVENTORIES,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  return data
}

//GET ALL INVENTORIES BY PROJECT ID
export async function fetchInventoriesByProjectoID() {
  let voidData= false
  const sessionUser = sessionStorage.getItem("user_data");

  if (!sessionUser) {
    console.log("Invalid project ID"); // volver al user a la vista de projects
  }

  const { projectId } = JSON.parse(sessionUser);

  const response = await fetch(URL_PROJECT+projectId+"/inventories",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const {inventories} = await response.json()
  // try {
  //   if(!Array.isArray(inventories) ) throw Error("Error fetching inventories by Projects")
  //   if(inventories.length === 0){
  //     const response2 = await fetch(URL_INVENTORIES,{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(
  //         {
  //           "id_proyecto":projectId
  //         }
  //       ),
  //     })
  //     voidData = await response2.json();
  //     voidData = [voidData.inventory] 
  //   }
  // } catch (error) {
  //   console.log("ERROR: ",error)
  // }
  // if(voidData) return voidData
  return inventories
}

export async function postInventory(){
  const sessionUser = sessionStorage.getItem("user_data");

  if (!sessionUser) {
    console.log("Invalid project ID"); // volver al user a la vista de projects
  }

  const { projectId } = JSON.parse(sessionUser);
  
  try {
      const response2 = await fetch(URL_INVENTORIES,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "id_proyecto":projectId
          }
        ),
      })
      const {inventory} = await response2.json();
      return [inventory] 
  } catch (error) {
    console.log("ERROR: ",error)
  }
}