import { NavLink } from "react-router";
import "./styles.css";
import ArrowBackIcon from "../icons/ArrowBackIcon";

const BackButton = ({className}) => {
  const iconProps = {
    width: 30, // Tus valores originales
    height: 30, // Tus valores originales
    fill: "#065e52", // Tus valores originales
  };

  return (
    <NavLink to="/home" className={`back ${className}`}>
      <ArrowBackIcon {...iconProps} />
    </NavLink>
  );
};

export default BackButton;
