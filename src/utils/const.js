export const iconWidth = 24;
export const iconHeigth = 24;
export const iconFill = "#008164";
export const secondaryColor = "#a81d1f"
export const messages = {
  crop: "Cultivo",
  season: "Temporada",
  inventory: "Inventario",
  activities: "Actividades",
  production: "Producción",
  sales: "Ventas",
  information: "Información",
  dashboard: "Dashboard",
  settings: "Configuración",
  logout: "Cerrar Sesión",
  sectionCrops: "Gestión de Cultivos",
  sectionMetrics: "Métricas",
  username: "John Doe",
  email: "john.doe@example.com",
};
export const welcomeTexts = {
  title: "Bienvenido a GestionA",
  descriptions: [
    `Crea un nuevo proyecto para comenzar.`,
    ` Haz clic en el siguiente botón para crear un nuevo proyecto`,
  ],
};
export const addProjecModalTexts = {
  title: "Crear un nuevo proyecto",
  description: "Ingresa el nombre del nuevo proyecto",
  descriptionLabel: "Descripción del proyecto",
  inputLabel: "Nombre Proyecto",
  placeholderInput: "Escriba el nombre del proyecto",
  placeholderTextArea: "Escriba la descripción del proyecto aquí...",
  confirmButtom: "Crear Proyecto",
  cancelButtom: "Cancelar",
};

export const formSignupTexts = {
  fullname: "Nombre Completo",
  email: "Correo",
  password: "Contraseña",
  createCount: "Crear Cuenta",
};

export const formLoginTexts = {
  email: "Correo",
  password: "Contraseña",
  login: "Iniciar Sesión",
};
export const API_URL = "http://localhost:3000/api/v1";
export const PROJECTS_PATH = "/projects";
export const USERS_PATH = "/users";
export const LOGIN_PATH = "/login";
export const CROPS_PATH = "/crops";
export const UNITS_PATH = "/units";
export const SALES_PATH = "/sales";
export const SEASONS_PATH = "/seasons";
export const USERS_HAS_PATH = "/users-has"
export const ROLES_PATH = "/roles"
export const ACTIVITIES_PATH = "/activities"
export const ACTIVITIES_MANAGEMENT_PATH = "/activities-management"

export const USER_SESSION = "user_data"

export const routes = {
  login: '/login',
  signup: '/signup',
  profile: '/profile' ,
  project: '/projects',
  home: '/home',
  season:'/season' ,
  crop: "/crop",
  supply: '/supply',
  information: '/information',
  dashboard: '/dashboard',
  sale: "/sales",
  activities: "/activities"
}
