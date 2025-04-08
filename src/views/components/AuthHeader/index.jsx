import LogoIcon from "../icons/LogoIcon";
import "./styles.css";

export const AuthHeader = () => {
  const sloganTitle = "GestionA";
  const sloganSubtitle = "Sistema de gestión agrícola";
  const icon = { with: 144, height: 144, fill: "#193C32" };

  return (
    <aside className="container__slogan">
      <header className="slogan__title">{sloganTitle}</header>
      <h2 className="slogan__subtitle">{sloganSubtitle}</h2>
      <LogoIcon width={icon.with} height={icon.height} fill={icon.fill} />
    </aside>
  );
};
