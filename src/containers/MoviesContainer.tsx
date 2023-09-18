/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { FormEvent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import moviesApi from '../helpers/utils/MoviesApi';
import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';

export default function MoviesContainer() {
  const location = useLocation();

  const [isShort, setIsShort] = useState(false);
  const [films, setFilms] = useState<any[]>([]);
  const [savedFilms, setSavedFilms] = useState<any[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<any[]>([]);
  const [userQuery, setUserQuery] = useState('');
  const [messageForUser, setMessageForUser] = useState('Здесь пока ничего нет =)');
  const [isFilter, setIsFilter] = useState(false);
  const [visibleFilms, setVisibleFilms] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(location.pathname !== '/movies');
  const [baseLimit, setBaseLimit] = useState(12);
  const [addedLimit, setAddedLimit] = useState(3);
  const [cntAddedContent, setCntAddedContent] = useState(0);
  const [localSavedFilms, setLocalSavedFilms] = useState<any[]>([]);

  const toTwoColumn = useMediaQuery('only screen and (max-width: 1095px)');
  const toOneColumn = useMediaQuery('only screen and (max-width: 683px)');

  // Functions
  const filterByQuery = () => ((isFilter ? filteredFilms : isSaved ? savedFilms : films)
    .filter((el: any): boolean => (
      el.nameRU.toLowerCase().includes(userQuery)
      || el.nameEN.toLowerCase().includes(userQuery))));

  const getVisibleFilms = () => {
    const data = userQuery
      ? filterByQuery()
      : isFilter
        ? filteredFilms
        : isSaved
          ? savedFilms : films;
    return data;
  };

  const getJsonQuery = (): string => {
    const data = {
      query: userQuery,
      isShort,
      localSaved: visibleFilms,
    };
    return JSON.stringify(data);
  };

  const onReset = () => {
    setUserQuery('');
    setIsShort(false);
    setCntAddedContent(0);
    setMessageForUser('Здесь пока ничего нет =)');
    window.localStorage.removeItem('movies-explorer-last-query');
  };

  const onSearch = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    value === userQuery
      ? setMessageForUser('Я уже пытался! Измените запрос пожалуйста...')
      : setUserQuery(value.toLowerCase());
  };

  const onClickAddedContent = () => { setCntAddedContent(cntAddedContent + 1); };

  // Use Effects
  useEffect(() => {
    const getData = async () => {
      setFilms((await moviesApi.getMovies()).map((film: any) => ({
        ...film,
        btnType: savedFilms.some((el) => el.id === film.id) ? 'movies-card__btn_saved' : 'movies-card__btn_save',
      })));
    };

    Promise.resolve()
      .then(() => {
        const storedData = window.localStorage.getItem('movies-explorer-last-query');
        return storedData ? JSON.parse(storedData) as {
          query: string; isShort: boolean; localSaved: any[]
        } : null;
      })
      .then((data) => {
        if (data) {
          setUserQuery(data.query);
          setIsShort(data.isShort);
          setLocalSavedFilms(data.localSaved);
        }
      })
      .then(() => {
        if (savedFilms.length === 0) {
          setSavedFilms([].map((film: object) => ({
            ...film,
            btnType: 'movies-card__btn_delete',
          })));
        }
      })
      .then(() => {
        if (films.length === 0) getData();
      });
  }, []);

  useEffect(() => {
    setIsSaved(location.pathname !== '/movies');
  }, [location.pathname]);

  useEffect(() => {
    setIsFilter(isShort);
    setFilteredFilms((isSaved ? savedFilms : films)
      .filter((el: any): boolean => (el.duration < 40)));
  }, [isShort, films, savedFilms]);

  useEffect(() => {
    if (userQuery && (visibleFilms.length === 0)) setMessageForUser('Ничего не найдено =(');
    if (userQuery || isFilter) {
      window.localStorage.setItem('movies-explorer-last-query', getJsonQuery());
    }
    if (localSavedFilms.length > 0) setLocalSavedFilms([]);
  }, [visibleFilms]);

  useEffect(() => {
    if (toTwoColumn) {
      setBaseLimit(8);
      setAddedLimit(2);
    } else if (toOneColumn) {
      setBaseLimit(5);
      setAddedLimit(2);
    } else {
      setBaseLimit(12);
      setAddedLimit(3);
    }
  }, [toTwoColumn, toOneColumn]);

  useEffect(() => {
    setVisibleFilms(getVisibleFilms());
  }, [userQuery, filteredFilms, films, savedFilms, isSaved]);

  return (
    <PageWithFilms
      isShort={isShort}
      setIsShort={setIsShort}
      films={(visibleFilms.length === 0 && localSavedFilms.length > 0
        ? localSavedFilms
        : visibleFilms)
        .slice(0, baseLimit + addedLimit * cntAddedContent)}
      onSearch={onSearch}
      isFilter={isFilter}
      messageForUser={messageForUser}
      onReset={onReset}
      onClickAddedContent={onClickAddedContent}
      cntFilms={visibleFilms.length}
      userQuery={userQuery}
    />
  );
}
