export async function getInformation() {
  const urls = {
    expenses: "http://localhost:3000/api/v1/expenses",
    sales: "http://localhost:3000/api/v1/sales",
    production: "http://localhost:3000/api/v1/product",
    supplies: "http://localhost:3000/api/v1/supplies",
    activitiesManagement: "http://localhost:3000/api/v1/activities-management",
    units: "http://localhost:3000/api/v1/units",
    activities: "http://localhost:3000/api/v1/activities",
    projects: "http://localhost:3000/api/v1/projects",
    crops: "http://localhost:3000/api/v1/crops",
    seasons: "http://localhost:3000/api/v1/seasons",
  };

  try {
    const responses = await Promise.all(
      Object.values(urls).map((url) =>
        fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(response => {
          if (!response.ok) {
            console.error(`Error fetching data from ${url}:`, response.statusText);
            return null;
          }
          return response.json();
        }).catch(error => {
          console.error(`Error fetching data from ${url}:`, error);
          return null;
        })
      )
    );

    const [
      expensesData,
      salesData,
      productionData,
      suppliesData,
      activitiesManagementData,
      unitData,
      activitiesData,
      projectsData,
      cropsData,
      seasonsData,
    ] = responses;

    const expenses = expensesData?.map((element, index) => {
      const units = unitData?.units?.find((unit) => unit.id === element.id_unidad_medida);
      const supplies = suppliesData?.data?.find((supply) => supply.id === element.id_insumo);

      return {
        id: index + 1,
        suppliesName: supplies?.nombre || "No disponible",
        usedQuantity: element.cantidad_usada,
        totalPrice: element.precio_total,
        unit: units?.nombre || "No disponible",
        idSeason: element.id_temporada,
      };
    }) || [];

    const sales = salesData?.sale?.map((element, index) => {
      const units = unitData?.units?.find((unit) => unit.id === element.id_unidad_medida);

      return {
        id: index + 1,
        soldQuantity: element.cantidad_vendida || 0,
        unitPrice: element.precio_unitario || 0,
        totalPrice: element.precio_total || 0,
        saleDate: element.fecha_venta || "",
        observations: element.observaciones || "Sin observaciones",
        unit: units?.nombre || "No disponible",
        idSeason: element.id_temporada,
      };
    }) || [];

    const production = productionData?.data?.map((element, index) => {
      const units = unitData?.units?.find((unit) => unit.id === element.id_unidad_medida);

      return {
        id: index + 1,
        name: element.nombre,
        harvestedQuantity: element.cantidad_recolectada,
        harvestDate: element.fecha_recoleccion,
        unit: units?.nombre || "No disponible",
        idSeason: element.id_temporada,
      };
    }) || [];

    const activityManagements = activitiesManagementData?.map((element, index) => {
      const activity = activitiesData?.activities?.find((activity) => activity.id === element.id_actividad);
      const expenses = expensesData?.find((expense) => expense.id === element.gasto_insumo_id);
      const supplies = suppliesData?.data?.find((supply) => supply.id === expenses?.id_insumo);

      return {
        id: index + 1,
        activityName: activity?.nombre || "No disponible",
        suppliesName: supplies?.nombre || "No disponible",
        usedQuantity: expenses?.cantidad_usada || 0,
        suppliesCost: expenses?.precio_total || "No disponible",
        totalCost: element.costo,
        idSeason: element.id_temporada,
      };
    }) || [];

    return {
      expenses,
      sales,
      production,
      activityManagements,
      projects: projectsData || [],
      crops: cropsData?.crops || [],
      seasons: seasonsData || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      expenses: [],
      sales: [],
      production: [],
      activityManagements: [],
    };
  }
}