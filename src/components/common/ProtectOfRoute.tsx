/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

// interface IProtectRoute {
//   Element: React.ComponentType,
//   onlyLoggedIn?: boolean,
// }

export default function ProtectRoute(
  { Element, onlyLoggedIn, ...props }: any
) {
  const curUser = useCurrentUser();

  return (
    (onlyLoggedIn ? curUser!.loggedIn : !curUser!.loggedIn) ? <Element {...props} /> : <Navigate to='/' replace />
  );
}

ProtectRoute.defaultProps = {
  onlyLoggedIn: false,
};
