import React, { useState } from 'react';
import Login from '../components/pages/Login/Login';

export default function LoginContainer() {
  const [isValidForm, setIsvalidForm] = useState(false);
  const [fetchCondition, setFetchCondition] = useState(false);

  const onSubmit = () => {
    setFetchCondition(true);
    setFetchCondition(false);
    setIsvalidForm(true);
  };

  return (
    <Login isValidForm={isValidForm} onSubmit={onSubmit} fetchCondition={fetchCondition} />
  );
}
