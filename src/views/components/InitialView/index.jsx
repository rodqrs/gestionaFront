import AddButton from "../addButton";
import { welcomeTexts } from "../../../utils/const";
import "./styles.css";

function InitialView({ buttonOnClick }) {
  const { title, descriptions } = welcomeTexts;
  return (
    <main className="container__iv">
      <h1 className="container__iv__title">{title}</h1>
      <div>
        {descriptions.map((description, index) => {
          return (
            <p key={index} className="container__iv__description">
              {description}
            </p>
          );
        })}
      </div>
      <AddButton onClick={buttonOnClick} />
    </main>
  );
}

export default InitialView;
