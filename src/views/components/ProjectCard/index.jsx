/* eslint-disable react/prop-types */
import { NavLink } from 'react-router';
import './styles.css';
import { DeleteButton } from '../Buttons/index';

function ProjectCard({ project, setActionProject }) {
 const projectNameString = project.nombre;
 const projectDescriptionString = project.descripcion;
 let projectInitials = '';
 if (projectNameString.includes(' ')) {
  const words = projectNameString.split(' ');
  projectInitials = words[0][0] + words[1][0];
  projectInitials = projectInitials.toUpperCase();
 } else {
  projectInitials = projectNameString[0];
 }

 const handlerDeleteProject = async (id) => {
  try {
   const userHasRow = await fetch(
    `http://localhost:3000/api/v1/projects/${id}/users-has`,
    {
     method: 'GET',
     headers: {
      'Content-Type': 'application/json',
     },
    }
   );

   const userHas = await userHasRow.json();

   await fetch(`http://localhost:3000/api/v1/users-has/${userHas.data[0].id}`, {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
    },
   });

   await fetch(`http://localhost:3000/api/v1/projects/${id}`, {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
    },
   });
   setActionProject((prev) => !prev);
  } catch (error) {
   console.log(error);
  }
 };
 const setProjectToSession = () => {
  const userData = sessionStorage.getItem('user_data');
  const user = JSON.parse(userData);
  const newUserData = {
   ...user,
   projectId: project.id,
  };

  sessionStorage.setItem('user_data', JSON.stringify(newUserData));
 };

 return (
  <div className='project-card__container'>
   <NavLink className='project-card' to={'/home'} onClick={setProjectToSession}>
    <div className='project-card__initials'>{projectInitials}</div>
    <div>
     <h3>{projectNameString}</h3>
     <p>{projectDescriptionString}</p>
    </div>
   </NavLink>
   <DeleteButton onClick={() => handlerDeleteProject(project.id)} />
  </div>
 );
}

export default ProjectCard;
