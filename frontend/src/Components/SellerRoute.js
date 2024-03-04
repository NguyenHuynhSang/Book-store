import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Store from '../Store';

export default function SellerRoute({ children }) {
  const { state } = useContext(Store);
  const { loggedUser } = state;
  return loggedUser && loggedUser.role === 'seller' ? (
    children
  ) : (
    <Navigate to="/"></Navigate>
  );
}
