import { useEffect, useState } from "react";
import "./styles.css";

function FilterSelect({
  title = "Título",
  listOptions,
  id,
  handleSelectedValue,
}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (listOptions) setList(listOptions);
  }, [listOptions]);

  const handleOnchange = (event) => {
    handleSelectedValue({ nombre: event.target.value });
  };

  return (
    <div className="filter-select">
      <h2 className="filter-select__title">{title}</h2>
      <div className="filter-select__container">
        <select
          className="filter-select__container__select"
          name="project"
          id={id}
          onChange={handleOnchange}
          defaultValue={""}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {list.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterSelect;
