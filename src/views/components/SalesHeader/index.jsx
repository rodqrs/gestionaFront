import BackButton from "../BackButton";
import "./styles.css";

const title = "REGISTRO DE VENTAS"

function SalesHeader() {
  return (
    <header className="sales__header">
      <BackButton className={"sales__backButton"} />
      <h1 className="sales__header__title">{title}</h1>
    </header>
  );
}

export default SalesHeader;
