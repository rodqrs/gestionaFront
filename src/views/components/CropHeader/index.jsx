import BackButton from '../BackButton';
import './styles.css';

const title = "CULTIVOS"

const CropHeader = () => (
  <header className="crop__header">
    <BackButton className={"crop__backButton"}/>
    <h1>{title}</h1>
  </header>
);

export default CropHeader;
