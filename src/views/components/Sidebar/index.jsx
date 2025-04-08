import ActivityIcon from '../icons/ActivityIcon';
import CropIcon from '../icons/CropIcon';
import DashboardIcon from '../icons/DashboardIcon';
import InformationIcon from '../icons/InformationIcon';
import InventoryIcon from '../icons/inventoryIcon';
// import ProductionIcon from '../icons/ProductionIcon';
import SaleIcon from '../icons/SaleIcon';
import SeasonIcon from '../icons/SeasonIcon';
import SettingsIcon from '../icons/SettingsIcon';
import SidebarFooter from '../SidebarFooter';
import SidebarHeader from '../SidebarHeader';
import SidebarLink from '../SidebarLink';
import SidebarNav from '../SidebarNav';

import { routes, USER_SESSION } from '../../../utils/const';

import './styles.css';
import { useEffect, useState } from 'react';
import getUserData from '../../../utils/getUserData';
import { LogoutButton } from '../Buttons';
import { useNavigate } from 'react-router';

const messages = {
 crop: 'Cultivo',
 season: 'Temporada',
 inventory: 'Inventario',
 activities: 'Actividades',
 production: 'Producción',
 sales: 'Ventas',
 information: 'Información',
 dashboard: 'Dashboard',
 settings: 'Configuración',
 logout: 'Cerrar Sesión',
 sectionCrops: 'Gestión de Cultivos',
 sectionMetrics: 'Métricas',
 username: 'John Doe',
 email: 'john.doe@example.com',
};
const {
 profile,
 season,
 crop,
 supply,
 information,
 dashboard,
 sale,
 activities,
} = routes;
const iconWidth = 24;
const iconHeigth = 24;
const iconFill = '#008164';

function Sidebar() {
 const [userData, setUserData] = useState({ nombre: '', email: '' });
 const sidebarNavigate = useNavigate();

 useEffect(() => {
  try {
   const sessionData = getUserData();
   if (!sessionData) throw new Error('error user session is invalid');
   const { nombre, email } = sessionData;
   setUserData({ nombre, email });
  } catch (error) {
   console.error('User session is invalid', error);
  }
 }, []);

 const handleLogout = () => {
  console.log('Cerrando Sesión');
  sessionStorage.removeItem(USER_SESSION);
  sidebarNavigate('/login');
 };

 return (
  <aside className='sidebar'>
   <SidebarHeader />
   <SidebarNav className='sidebar__overwiew' title={messages.sectionCrops}>
    <SidebarLink
     href={crop}
     IconComponent={CropIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconStroke={iconFill}
     text={messages.crop}
    />
    <SidebarLink
     href={season}
     IconComponent={SeasonIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.season}
    />
    <SidebarLink
     href={activities}
     IconComponent={ActivityIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.activities}
    />
    <SidebarLink
     href={supply}
     IconComponent={InventoryIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.inventory}
    />

    {/* <SidebarLink
          href="#"
          IconComponent={ProductionIcon}
          iconWidth={iconWidth}
          iconHeight={iconHeigth}
          iconStroke={iconFill}
          text={messages.production}
        /> */}
    <SidebarLink
     href={sale}
     IconComponent={SaleIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.sales}
    />
   </SidebarNav>
   <SidebarNav className='sidebar__overwiew' title={messages.sectionMetrics}>
    <SidebarLink
     href={information}
     IconComponent={InformationIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.information}
    />
    <SidebarLink
     href={dashboard}
     IconComponent={DashboardIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.dashboard}
    />
   </SidebarNav>
   <SidebarNav className='sidebar__account' title={'Cuenta'}>
    <SidebarLink
     href={profile}
     IconComponent={SettingsIcon}
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     text={messages.settings}
    />
    <LogoutButton
     iconWidth={iconWidth}
     iconHeight={iconHeigth}
     iconFill={iconFill}
     onClick={handleLogout}
    />
   </SidebarNav>
   <SidebarFooter
    username={userData.nombre || 'nombre'}
    email={userData.email || 'correo'}
   />
  </aside>
 );
}

export default Sidebar;
