/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

interface IProtectRoute<T> {
  Element: (data: T) => JSX.Element,
  onlyLoggedIn?: boolean,
  data?: T,
}

export default function ProtectRoute<T>(
  { Element, onlyLoggedIn, data }: IProtectRoute<T>
) {
  const { loggedIn } = useCurrentUser();
  return (
    (onlyLoggedIn ? loggedIn : !loggedIn) ? <Element {...data as (T & JSX.IntrinsicAttributes)} /> : <Navigate to='/' replace />
  );
}

ProtectRoute.defaultProps = {
  onlyLoggedIn: false,
  data: undefined,
};
