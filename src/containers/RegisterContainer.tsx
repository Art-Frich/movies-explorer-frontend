import React, { useState } from 'react';
import Register from '../components/pages/Register/Register';

export default function RegisterContainer() {
  const [isValidForm, setIsvalidForm] = useState(true);
  const [fetchCondition, setFetchCondition] = useState(false);

  const onSubmit = () => {
    setFetchCondition(true);
    setFetchCondition(false);
    setIsvalidForm(true);
  };

  return (
    <Register isValidForm={isValidForm} onSubmit={onSubmit} fetchCondition={fetchCondition} />
  );
}
