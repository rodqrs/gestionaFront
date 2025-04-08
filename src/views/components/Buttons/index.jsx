import CloseIcon from "../icons/CloseIcon";
import {
  iconFill,
  iconHeigth,
  iconWidth,
  secondaryColor,
} from "../../../utils/const";
import "./styles.css";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import LogoutIcon from "../icons/LogoutIcon";

export function PrimaryButton({ onClick, type, children, className }) {
  return (
    <button className={`primary-button__component ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export function SecondaryButton({ onClick, type, children }) {
  return (
    <button className="secondary-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export function CloseButton({ className, onClick }) {
  const fillIcon = "#8b8d98";
  const iconSize = 20;
  return (
    <button className={`close-button ${className}`} onClick={onClick}>
      <CloseIcon width={iconSize} height={iconSize} fill={fillIcon} />
    </button>
  );
}

export function EditButton({
  className,
  onClick,
  iconColor = iconFill,
  iconWidth = 24,
  iconHeight = 24,
  title = "Botón",
}) {
  return (
    <button
      title={title}
      className={`edit-button ${className}`}
      onClick={onClick}
    >
      <EditIcon width={iconWidth} height={iconHeight} fill={iconColor} />
    </button>
  );
}

export function DeleteButton({
  className,
  onClick,
  iconColor = secondaryColor,
  iconWidth = 24,
  iconHeight = 24,
  title = "Botón",
}) {
  return (
    <button
      title={title}
      className={`delete-button ${className}`}
      onClick={onClick}
    >
      <DeleteIcon width={iconWidth} height={iconHeight} fill={iconColor} />
    </button>
  );
}

export function LogoutButton({
  title = "Cerrar Sesión",
  iconWidth = 30,
  iconHeight = 30,
  iconColor = iconFill,
  onClick
}) {
  return (
    <button className="logout-button" onClick={onClick}>
      <LogoutIcon width={iconWidth} height={iconHeight} fill={iconColor} />
      <span className="logout-button__text">{title}</span>
    </button>
  );
}
