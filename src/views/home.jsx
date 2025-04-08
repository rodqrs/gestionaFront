import { useNavigate } from 'react-router';
import { PrimaryButton } from './components/Buttons';
import Card from './components/Card';
import ActivityIcon from './components/icons/ActivityIcon';
import CropIcon from './components/icons/CropIcon';
import DashboardIcon from './components/icons/DashboardIcon';
import InformationIcon from './components/icons/InformationIcon';
import InventoryIcon from './components/icons/inventoryIcon';
import SaleIcon from './components/icons/SaleIcon';
import SeasonIcon from './components/icons/SeasonIcon';
import OptionMenu from './components/OptionMenu';
import Sidebar from './components/Sidebar';

import './styles/home.css';

const iconParams = {
 width: 50,
 height: 50,
 fill: '#193c32',
};

const paths = {
 cropt: '/crop',
 season: '/season',
 inventory: '/supply',
 activity: '/activities',
 production: '/production',
 sale: '/sales',
 information: '/information',
 dashboard: '/dashboard',
};

export default function Home() {
 const homeNavigate = useNavigate();
 const handleOnClick = () => {
  homeNavigate('/projects');
 };

 return (
  <div className='home-view'>
   <Sidebar />
   <main className='page-container'>
    <PrimaryButton className={'home__change-button'} onClick={handleOnClick}>
     Cambiar Proyecto
    </PrimaryButton>
    <OptionMenu title={'GESTIÓN CULTIVOS'}>
     <Card
      IconComponent={CropIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconStroke={iconParams.fill}
      title={'Cultivo'}
      href={paths.cropt}
     />
     <Card
      IconComponent={SeasonIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconFill={iconParams.fill}
      title={'Temporada'}
      href={paths.season}
     />
     <Card
      IconComponent={ActivityIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconFill={iconParams.fill}
      title={'Registro de Actividades'}
      href={paths.activity}
     />
     <Card
      IconComponent={InventoryIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconFill={iconParams.fill}
      title={'Inventario de Insumos'}
      href={paths.inventory}
     />

     {/* <Card
      IconComponent={ProductionIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconStroke={iconParams.fill}
      title={'Registro de Producción'}
      href={paths.production}
     /> */}
     <Card
      IconComponent={SaleIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconFill={iconParams.fill}
      title={'Registro de Ventas'}
      href={paths.sale}
     />
    </OptionMenu>
    <OptionMenu title={'MÉTRICAS'}>
     <Card
      IconComponent={InformationIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconFill={iconParams.fill}
      title={'Información'}
      href={paths.information}
     />
     <Card
      IconComponent={DashboardIcon}
      iconWidth={iconParams.width}
      iconHeight={iconParams.height}
      iconFill={iconParams.fill}
      title={'Dashboard'}
      href={paths.dashboard}
     />
    </OptionMenu>
   </main>
  </div>
 );
}
