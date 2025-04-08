import InitialSidebar from './components/InitialSidebar';
import InitialView from './components/InitialView';
import AddProjectModal from './components/AddProjectModal';
import ProjectsList from './components/ProjectsList';
import { useEffect, useRef, useState } from 'react';
import {
 createProject,
 getProjectsByUserId,
 updateSessionProjects,
} from '../services/projectService';

import './styles/project.css';

export default function Project() {
 const dialogRef = useRef(null);
 const [projects, setProjects] = useState([]);
 const [actionProject, setActionProject] = useState(false);
 const [user, setUser] = useState({});

 useEffect(() => {
  const dataSessionStorage = sessionStorage.getItem('user_data');
  const dataSession = JSON.parse(dataSessionStorage);
  if (!dataSession) {
   console.log('session not exist');
   return;
  }

  const { id: userId, nombre: name, email } = dataSession;

  setUser({ userId, name, email });

  try {
   const getUserProjects = async () => {
    const response = await getProjectsByUserId(userId);
    console.log('Response', response);
    if (!response) throw new Error('Error fetching projects');
    await updateSessionProjects(response);
    setProjects(response);
   };
   getUserProjects();
  } catch (error) {
   console.error('Error fetching userProjects', error);
  }
 }, [actionProject]);

 const handleOpenModal = () => {
  if (dialogRef.current) dialogRef.current.showModal();
 };

 const handleCloseModal = () => {
  if (dialogRef.current) dialogRef.current.close();
 };
 const handelAddElement = async (element) => {
  try {
   const response = await createProject(element, user.userId);
   if (!response) throw new Error('Error al crear el proyecto');
   setProjects((prevProjects) => [...prevProjects, response]);
   setActionProject((prev) => !prev);
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <div className='container-project'>
   <InitialSidebar userData={user} />
   {!projects.length ? (
    <InitialView buttonOnClick={handleOpenModal} />
   ) : (
    <ProjectsList
     buttonOnClick={handleOpenModal}
     projects={projects}
     setActionProject={setActionProject}
    />
   )}
   <AddProjectModal
    ref={dialogRef}
    onClose={handleCloseModal}
    onAddElement={handelAddElement}
   />
  </div>
 );
}
