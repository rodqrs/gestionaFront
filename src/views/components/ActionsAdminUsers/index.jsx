import SearchIcon from "../icons/SearchIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

import "./styles.css"

export default function ActionsAdminUsers({onClickOpenEditModal, onClickDeleteModal}){
    const iconProps={
        width:30,
        height:30,
        fill:"#000000" 
    }; 
    return(
        <section className="add-search-section">
            <div >
                <SearchIcon {...iconProps} />
            </div>
            <div onClick={onClickOpenEditModal} >
                <EditIcon {...iconProps} />
            </div>
            <div onClick={onClickDeleteModal} >
                <DeleteIcon {...iconProps} />
            </div>
        </section>
    )
}