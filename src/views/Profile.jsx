import Sidebar from './components/Sidebar';
import UserProfile from './components/UserProfile';
import AdminUsers from './components/AdminUsers';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import { useRef } from 'react';
import ActionsAdminUsers from './components/ActionsAdminUsers';

import './styles/profile.css';

export default function Profile() {
 const AddUserModalreF = useRef(null);
 const EditUserModalreF = useRef(null);

 const handleOpenAddModal = () => {
  AddUserModalreF.current.showModal();
 };
 const handleCloseAddModal = () => {
  AddUserModalreF.current.close();
 };
 const handleOpenEditModal = () => {
  EditUserModalreF.current.showModal();
 };
 const handleCloseEditModal = () => {
  EditUserModalreF.current.close();
 };

 return (
  <div className='app-container'>
   <Sidebar />
   <div className='content-container' aria-label='content-profile'>
    <header className='profile-header'></header>
    <main>
     <UserProfile />
     <AdminUsers
      onClickAddButton={handleOpenAddModal}
      actionsComponent={
       <ActionsAdminUsers onClickOpenEditModal={handleOpenEditModal} />
      }
     />
     <AddUserModal onClose={handleCloseAddModal} ref={AddUserModalreF} />
     <EditUserModal onClose={handleCloseEditModal} ref={EditUserModalreF} />
    </main>
   </div>
  </div>
 );
}
