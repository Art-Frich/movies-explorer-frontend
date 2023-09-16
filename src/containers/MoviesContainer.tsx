/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { FormEvent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moviesApi from '../helpers/utils/MoviesApi';
import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';

export default function MoviesContainer() {
  const location = useLocation();

  const [isShort, setIsShort] = useState(false);
  const [films, setFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);
  const [fetchCondition, setFetchCondition] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [messageForUser, setMessageForUser] = useState('Здесь пока ничего нет =)');
  const [isFilter, setIsFilter] = useState(false);
  const [visibleFilms, setVisibleFilms] = useState([]);
  const [isSaved, setIsSaved] = useState(location.pathname !== '/movies');

  // Functions
  const filterByQuery = () => ((isFilter ? filteredFilms : isSaved ? savedFilms : films)
    .filter((el: any): boolean => (
      el.nameRU.toLowerCase().includes(userQuery)
      || el.nameEN.toLowerCase().includes(userQuery))));

  const getVisibleFilms = () => (
    userQuery ? filterByQuery() : isFilter ? filteredFilms : isSaved ? savedFilms : films
  );

  const onReset = () => {
    setUserQuery('');
    setIsShort(false);
    setMessageForUser('Здесь пока ничего нет =)');
  };

  const onSearch = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    value === userQuery
      ? setMessageForUser('Я уже пытался! Измените запрос пожалуйста...')
      : setUserQuery(value.toLowerCase());
  };

  // Use Effects
  useEffect(() => {
    const getData = async () => {
      setFetchCondition(true);
      setFilms(await moviesApi.getMovies());
      setFetchCondition(false);
    };

    setSavedFilms([]);
    getData();
  }, []);

  useEffect(() => {
    setIsSaved(location.pathname !== '/movies');
  }, [location.pathname]);

  useEffect(() => {
    setIsFilter(isShort);
    setFilteredFilms((isSaved ? savedFilms : films).filter((el: any): boolean => (
      el.duration < 40)));
  }, [isShort]);

  useEffect(() => {
    if (userQuery && (visibleFilms.length === 0)) setMessageForUser('Ничего не найдено =(');
  }, [visibleFilms]);

  useEffect(() => {
    setVisibleFilms(getVisibleFilms());
  }, [userQuery, filteredFilms, films, savedFilms, isSaved]);

  return (
    <PageWithFilms
      isShort={isShort}
      setIsShort={setIsShort}
      films={visibleFilms}
      onSearch={onSearch}
      fetchCondition={fetchCondition}
      messageForUser={messageForUser}
      onReset={onReset}
    />
  );
}
