import './styles/dashboard.css';
import Sidebar from './components/Sidebar';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '20px' }}>

                <h1 id="title">Dashboard</h1>
                
                    <nav className="horizontal-nav">
                        <div className="nav-item">
                            <h2>Proyecto</h2>
                            <div className="select-container">
                                <label htmlFor="proyect-select"></label>
                                <select name="proyect" id="proyect-select">
                                    <option value="andina">Región Andina</option>
                                    <option value="caribe">Región Caribe</option>
                                    <option value="pacifica">Región Pacífica</option>
                                    <option value="amazonia">Región Amazonia</option>
                                    <option value="orinoquia">Región Orinoquia</option>
                                </select>
                            </div>
                        </div>

                        <div className="nav-item">
                            <h2>Cultivo</h2>
                            <div className="select-container">
                                <label htmlFor="cultivo-select"></label>
                                <select name="cultivo" id="cultivo-select">
                                    <option value="Arroz">Arroz</option>
                                    <option value="Mandarina">Mandarina</option>
                                    <option value="Cacao">Cacao</option>
                                    <option value="Cafe">Café</option>
                                </select>
                            </div>
                        </div>

                        <div className="nav-item">
                            <h2>Temporada</h2>
                            <div className="select-container">
                                <label htmlFor="Temporada"></label>
                                <select name="Temporada" id="Temporada">
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
                        </div>
                    </nav>
                <br />
                
                <h2 className="title_graphic">Balance</h2>
                <br />
                <section className="graphic_container">
                    <div className="graphic"></div>
                    <div className="container_leyenda">
                        {[
                            { color: "color_expenses", text: "40% Gastos" },
                            { color: "sales_color", text: "60% Ventas" }
                        ].map((item, index) => (
                            <span className="legend_all" key={index}>
                                <span className={item.color}></span>
                                <p className="item">{item.text}</p>
                            </span>
                        ))}
                        <p className="total">Total: $ 16.235.000</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;


