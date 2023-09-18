import { Navigate } from 'react-router-dom';
import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

export default function ProtectRoute({ Element }: { Element: React.ComponentType, }) {
  const curUser = useCurrentUser();

  return (
    curUser!.loggedIn ? <Element /> : <Navigate to='/' replace />
  );
}
