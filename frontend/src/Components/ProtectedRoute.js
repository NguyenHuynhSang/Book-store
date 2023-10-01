import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Store from '../Store';

export default function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { loggedUser } = state;
  return loggedUser && loggedUser.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/"></Navigate>
  );
}
