import SidebarHeader from "../SidebarHeader";
import SidebarFooter from "../SidebarFooter";
import SidebarLink from "../SidebarLink";
import SidebarNav from "../SidebarNav";
import SettingsIcon from "../icons/SettingsIcon";
import {
  iconFill,
  iconWidth,
  iconHeigth,
  messages,
  USER_SESSION,
  routes,
} from "../../../utils/const";

import "./styles.css";
import { LogoutButton } from "../Buttons";
import { useNavigate } from "react-router";

const {login, profile} = routes

function InitialSidebar({ userData }) {
  const { settings, logout } = messages;
  const initSidNavigate = useNavigate()
  let { name, email } = userData;


  if (!userData || Object.keys(userData).length === 0) {
    name = "No disponible";
    email = "Correo No disponible";
  }

  const handleLogout = ()=>{
    sessionStorage.removeItem(USER_SESSION)
    initSidNavigate(login)
  }

  return (
    <aside className="sidebar">
      <SidebarHeader showButton={false} />
      <SidebarNav className="sidebar__account" title={"Cuenta"}>
        <SidebarLink
          href={profile}
          IconComponent={SettingsIcon}
          iconWidth={iconWidth}
          iconHeight={iconHeigth}
          iconFill={iconFill}
          text={settings}
        />
        <LogoutButton
          iconWidth={iconWidth}
          iconHeight={iconHeigth}
          iconColor={iconFill}
          text={logout}
          onClick={handleLogout}
        />
      </SidebarNav>
      <SidebarFooter username={name} email={email} />
    </aside>
  );
}

export default InitialSidebar;
