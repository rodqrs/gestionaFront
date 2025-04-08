/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

export const ValidateUserRoute = ({ redirectTo }) => {
 const navigate = useNavigate();

 const userData = sessionStorage.getItem('user_data');
 const user = JSON.parse(userData);

 useEffect(() => {
  if (!user) {
   navigate(redirectTo);
  }
 }, []);

 return <Outlet />;
};
