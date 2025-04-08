
import "./styles.css"

export default function BeginEndBar({crop}){
    return(
        <div className="season-actions">
            <h2 className="season-number-text">Cultivo: <span className="season-number-text-value">{crop}</span></h2> 
        </div>
    )
}