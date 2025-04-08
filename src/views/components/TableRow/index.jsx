import PropTypes from "prop-types";
import "./styles.css"; // Asegúrate de que el archivo `styles.css` exista en la misma carpeta
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ViewIcon from "../icons/EyeIcon";

const TableRow = ({ id }) => {
  const iconProps = {
    width: 20, // Tus valores originales
    height: 20, // Tus valores originales
    fill: "#065e52", // Tus valores originales
  };

  return (
    <tr>
      <td data-label="ID">{id}</td>
      <td data-label="Campo 1">XXXXXXXXXX</td>
      <td data-label="Campo 2">XXXXXXXXXX</td>
      <td data-label="Campo 3">XXXXXXXXXX</td>
      <td data-label="Fecha">XX/XX/XXXX</td>
      <td className="actions" data-label="Acciones">
        <ViewIcon {...iconProps} />
        <EditIcon {...iconProps} />
        <DeleteIcon {...iconProps} />
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TableRow;


