import "./styles/activities.css";
import Sidebar from "./components/Sidebar";
import ActivitiesView from "./components/ActivitiesView";

export default function Activities() {
  return (
    <div className="container-activities">
      <Sidebar />
      <ActivitiesView />
    </div>
  );
}
