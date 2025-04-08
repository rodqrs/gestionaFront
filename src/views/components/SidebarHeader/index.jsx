import { NavLink } from 'react-router';
import CaretIcon from '../icons/CaretIcon';
import LogoIcon from '../icons/LogoIcon';
import './styles.css';

function SidebarHeader({ showButton = true }) {
 const widthLogo = 52;
 const heightLogo = 60;
 const fillLogo = '#008164';

 return (
  <header className='sidebar__header'>
   <NavLink to='/home'>
    <LogoIcon width={widthLogo} height={heightLogo} fill={fillLogo} />
    <div className='header__slogan'>
     <h1 className='slogan__title'>GestionA</h1>
     <h2 className='slogan__description'>Sistema de gestión agrícola</h2>
    </div>
   </NavLink>
   {showButton && (
    <CaretIcon
     className='header__icon'
     width={20}
     height={20}
     fill={fillLogo}
    />
   )}
  </header>
 );
}

export default SidebarHeader;
