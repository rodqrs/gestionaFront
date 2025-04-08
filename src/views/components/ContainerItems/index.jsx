import FilterSelect from "../FilterSelect";
import "./styles.css";

function ContainerItems({ children, className }) {
  return (
    <nav className={`container-items ${className}`}>
      {children}
    </nav>
  );
}

export default ContainerItems;
