import BackButton from "../BackButton"
import "./styles.css"

export default function TitleSection({title}){
    return(
        <header className="title-section__component">
            <BackButton className={"title-section__backButton"}/>
            <h1>{title}</h1>
        </header>
    )
}