/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

// interface IProtectRoute {
//   Element: React.ComponentType,
//   onlyLogedIn?: boolean,
// }

export default function ProtectRoute(
  { Element, onlyLogedIn, ...props }: any
) {
  const curUser = useCurrentUser();

  return (
    (onlyLogedIn ? curUser!.loggedIn : !curUser!.loggedIn) ? <Element {...props} /> : <Navigate to='/' replace />
  );
}

ProtectRoute.defaultProps = {
  onlyLogedIn: false,
};
