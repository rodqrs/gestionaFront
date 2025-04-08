import "./styles.css";

export default function OptionMenu({ title, children }) {
  return (
    <section className="option-menu">
      <h1 className="option-menu__title">{title}</h1>
      <div className="option-menu__sections">{children}</div>
    </section>
  );
}
