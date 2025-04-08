import Sidebar from "./components/Sidebar"
import TitleSection from "./components/TitleSection"
import BeginEndBar from "./components/BeginEndBar"
import ActionsBar from "./components/ActionsBar"
import TableSeason from "./components/TableSeason"
import AddSeasonModal from "./components/AddSeasonModal"
import EditSeasonModal from "./components/EditSeasonModal"
import DeleteSeasonModal from "./components/DeleteSeasonModal/DeleteSeasonModal"
import SearchSeasonModal from "./components/SearchSeasonModal"
import { addSeasonToProject, deleteSeasonToProject } from "../utils/updateSessionStorage"
import { 
    createSeason, editSeason, deleteSeason,fetchCrops, fetchNews, fetchCropSeasons 
} from "../services/seasonServices"
import { useState, useEffect, useRef } from "react"

import "./styles/season.css"

export default function Season(){
    const [add,setAdd] = useState(false)
    const [edit,setEdit] = useState(false)
    const [deletes,setDeletes] = useState(false)
    const [search,setSearch]= useState(false)
    const [data,setData]=useState([])
    const [dataSearch,setDataSearch] = useState(null)
    const [cropsData,setCropsData]=useState()
    const [newsData,setNewsData]=useState()
    const id = useRef(null)
    const idCrop = useRef(null)
    const cropName = useRef("XXXXXX")

    useEffect(()=>{
        async function fetchDataCrops(){
            try {
                const result = await fetchCrops()
                setCropsData(result);
                fetchData(result[0].id);
                cropName.current = result[0].nombre
            } catch (error) {
                console.error('Error fetching crops data(F):', error);
            }
        };
        fetchDataNews();
        fetchDataCrops();
    },[])

    
    async function fetchData(id){
        try {
            const result = await fetchCropSeasons(id)
            setData(result);
        } catch (error) {
            console.error('Error fetching news data(F):', error);
        }
        };

    async function fetchDataNews(){
            try {
                const result = await fetchNews()
                setNewsData(result);
            } catch (error) {
                console.error('Error fetching season C data(F):', error);
            }
        }

    const handleAddModal=()=>{
        setAdd(!add)
    }
    const handleEditModal=()=>{
        setEdit(!edit)
    }
    const handleDeletesModal=()=>{
        setDeletes(!deletes) 
    }

    const handleSearchModal=()=>{
        setSearch(!search)
    }

    const handleSelectedData=(param)=>{
        id.current=param
    }

    const handleAddFetch=async(season)=>{
        const response = await createSeason(season)
        const name = cropsData.find((crop)=>crop.id === idCrop.current)
        cropName.current = name.nombre
        fetchData(idCrop.current)
        addSeasonToProject(response)
        handleAddModal()
    }

    const handleEditFetch =async(season,old)=>{
        const response = await editSeason(id.current,season)
        const name = cropsData.find((crop)=>crop.id === idCrop.current)
        cropName.current = name.nombre
        fetchData(idCrop.current)
        deleteSeasonToProject(id.current,old)
        addSeasonToProject(response)
        handleEditModal()
    }
    
    const handleDeleteFecth= async()=>{
        await deleteSeason(id.current)
        const name = cropsData.find((crop)=>crop.id === idCrop.current)
        cropName.current = name.nombre
        fetchData(idCrop.current)
        deleteSeasonToProject(id.current,idCrop.current)
        handleDeletesModal()
        id.current=null
    }

    const handleSearch=(id,nombre)=>{
        fetchData(id)
        cropName.current = nombre
        handleSearchModal()
    }

    return(
        <div className="season-view">
            <Sidebar />
            <main className="season-main-view">
                <TitleSection title="TEMPORADA" />

                <section className="section-bar-actions">
                    <BeginEndBar crop={cropName.current} />
                    <ActionsBar 
                     handleAddModal={handleAddModal} 
                     handleEditModal={handleEditModal}  
                     handleDeleteModal={handleDeletesModal}
                     handleSearchModal={handleSearchModal}
                     dataSearch={dataSearch}
                     setDataSearch={setDataSearch} />
                </section>

                <TableSeason
                 datos={data}
                 handleSelectedData={handleSelectedData}
                 handleDeleteModal={handleDeletesModal}
                 handleEditModal={handleEditModal}
                 idCrop={idCrop}  /> 

                {add && <AddSeasonModal
                 handleOpenModal={handleAddModal}
                 handleAddFetch={handleAddFetch}
                 idCrop={idCrop} 
                 cropsData={cropsData}
                 newsData={newsData} 
                 completeData={data} />}

                {edit && <EditSeasonModal
                 handleEditModal={handleEditModal}
                 handleEditFetch={handleEditFetch}
                 id={id.current}
                 idCrop={idCrop} 
                 completeData={data}
                 cropsData={cropsData} 
                 newsData={newsData} /> }

                {deletes && <DeleteSeasonModal
                 handleOpenModal={handleDeletesModal}
                 handleDeleteFecth={handleDeleteFecth}
                 id={id.current} />}

                 {search && <SearchSeasonModal 
                 dataCrop={cropsData} 
                 handleSearchModal={handleSearchModal} 
                 handleSearch={handleSearch} /> }
            </main>
        </div>
    )
}