import { API_URL, SALES_PATH, SEASONS_PATH, UNITS_PATH } from "../utils/const";

const salesUrl = API_URL + SALES_PATH;
const seasonsUrl = API_URL + SEASONS_PATH;
const unitsUrl = API_URL + UNITS_PATH;
const urls = [salesUrl, seasonsUrl, unitsUrl];

export async function createSale(sale) {
  try {
    const response = await fetch(salesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });
    if (!response.ok) throw new Error("Error creating sale");
    const data = await response.json();

    if (!data.success) throw new Error("Error creating sale");

    const [seasonsRes, unitsRes] = await Promise.all(
      [seasonsUrl, unitsUrl].map((url) =>
        fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    if (![seasonsRes, unitsRes].every((res) => res.ok)) {
      throw new Error("Una o mas repuestas de la API no fueron exitosas");
    }
    const [seasonsData, unitsData] = await Promise.all([
      seasonsRes.json(),
      unitsRes.json(),
    ]);

    const {
      cantidad_vendida: cantidadVendida,
      fecha_venta: fechaVenta,
      id,
      id_temporada: idTemporada,
      id_unidad_medida: idUnidadMedida,
      observaciones,
      precio_total: precioTotal,
      precio_unitario: precioUnitario,
    } = data.sale;

    const season = seasonsData.find((season) => season.id === idTemporada);
    const unit = unitsData.units.find((unit) => unit.id === idUnidadMedida);

    const newSale = {
      temporada: season.nombre,
      fechaVenta,
      cantidadVendida,
      unidadMedida: unit.nombre,
      precioUnitario,
      precioTotal,
      observaciones,
      idSale: id,
      idTemporada,
    };
    return newSale;
  } catch (error) {
    console.error("Error creating sale: ", error);
  }
}

export async function getSalesData() {
  try {
    const [salesRes, seasonsRes, unitsRes] = await Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    if (![salesRes, seasonsRes, unitsRes].every((res) => res.ok)) {
      throw new Error("Una o mas repuestas de la API no fueron exitosas");
    }
    const [salesData, seasonsData, unitsData] = await Promise.all([
      salesRes.json(),
      seasonsRes.json(),
      unitsRes.json(),
    ]);
    const data = salesData.sale.map((sale, index) => {
      const {
        cantidad_vendida: cantidadVendida,
        fecha_venta: fechaVenta,
        id,
        id_temporada: idTemporada,
        id_unidad_medida: idUnidadMedida,
        observaciones,
        precio_total: precioTotal,
        precio_unitario: precioUnitario,
      } = sale;
      const season = seasonsData.find((season) => season.id === idTemporada);
      const unit = unitsData.units.find((unit) => unit.id === idUnidadMedida);

      return {
        id: index + 1,
        temporada: season.nombre,
        fechaVenta,
        cantidadVendida,
        unidadMedida: unit.nombre,
        precioUnitario,
        precioTotal,
        observaciones,
        idSale: id,
        idTemporada,
      };
    });
    return data;
  } catch (error) {
    console.error("error fetching data", error);
    return [];
  }
}

export async function getSaleByIdSeason(seasonId) {
  if (!seasonId) throw new Error("Season id is required");
  if (typeof seasonId !== "string")
    throw new Error("Season id must be a String");
  const urlSale = `${seasonsUrl}/${seasonId}${SALES_PATH}`;
  const urls = [urlSale, seasonsUrl, unitsUrl];
  try {
    const [salesRes, seasonsRes, unitsRes] = await Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    if (![salesRes, seasonsRes, unitsRes].every((res) => res.ok)) {
      throw new Error("Una o mas repuestas de la API no fueron exitosas");
    }
    const [salesData, seasonsData, unitsData] = await Promise.all([
      salesRes.json(),
      seasonsRes.json(),
      unitsRes.json(),
    ]);
    const data = salesData.sales.map((sale, index) => {
      const {
        cantidad_vendida: cantidadVendida,
        fecha_venta: fechaVenta,
        id,
        id_temporada: idTemporada,
        id_unidad_medida: idUnidadMedida,
        observaciones,
        precio_total: precioTotal,
        precio_unitario: precioUnitario,
      } = sale;
      const season = seasonsData.find((season) => season.id === idTemporada);
      const unit = unitsData.units.find((unit) => unit.id === idUnidadMedida);

      return {
        id: index + 1,
        temporada: season.nombre,
        fechaVenta,
        cantidadVendida,
        unidadMedida: unit.nombre,
        precioUnitario,
        precioTotal,
        observaciones,
        idSale: id,
        idTemporada,
      };
    });
    return data;
  } catch (error) {
    console.error("error fetching data", error);
    return [];
  }
}

export async function deleteSale(saleId) {
  if (!saleId) throw new Error("Sale id is required");
  if (typeof saleId !== "string") throw new Error("Sale id must be a string");

  const url = `${salesUrl}/${saleId}`;

  try {
    const saleRes = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!saleRes.ok) throw new Error("Error deleting sale");

    const saleData = await saleRes.json();
    console.log("Delete Successful");
    return saleData.sale;
  } catch (error) {
    console.error("Error deleting sale", error);
  }
}

export async function updateSale({ saleId, newSale }) {
  if (!saleId) throw new Error("Sale Id is required");
  if (typeof saleId !== "string") throw new Error("Sale id must be a string");
  if (!newSale) throw new Error("sale updated object is required");
  if (typeof newSale !== "object")
    throw new Error("Sale updated object must be an Object");

  const url = `${salesUrl}/${saleId}`;

  try {
    const saleRes = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSale),
    });

    if (!saleRes.ok) throw new Error("Error updating sale");

    const saleData = await saleRes.json();

    const [seasonsRes, unitsRes] = await Promise.all(
      [seasonsUrl, unitsUrl].map((url) =>
        fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    if (![seasonsRes, unitsRes].every((res) => res.ok)) {
      throw new Error("Una o mas repuestas de la API no fueron exitosas");
    }
    const [seasonsData, unitsData] = await Promise.all([
      seasonsRes.json(),
      unitsRes.json(),
    ]);

    const {
      cantidad_vendida: cantidadVendida,
      fecha_venta: fechaVenta,
      id,
      id_temporada: idTemporada,
      id_unidad_medida: idUnidadMedida,
      observaciones,
      precio_total: precioTotal,
      precio_unitario: precioUnitario,
    } = saleData.sale;

    const season = seasonsData.find((season) => season.id === idTemporada);
    const unit = unitsData.units.find((unit) => unit.id === idUnidadMedida);

    const newData = {
      temporada: season.nombre,
      fechaVenta,
      cantidadVendida,
      unidadMedida: unit.nombre,
      precioUnitario,
      precioTotal,
      observaciones,
      idSale: id,
      idTemporada,
    };

    console.log("Update successful");

    return newData;
  } catch (error) {
    console.error("Error updating sale", error);
  }
}
