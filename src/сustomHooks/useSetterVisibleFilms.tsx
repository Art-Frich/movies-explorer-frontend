import { useMediaQuery } from '@react-hook/media-query';
import { useState, useEffect } from 'react';
import { optionsUseSetterBisibleFilms } from '../helpers/constants';

export default function useSetterVisibleFilms() {
  const {
    toTwoColumnWidth,
    toOneColumnWidth,
    baseLimitThreeColumn,
    baseLimitTwoColumn,
    baseLimitOneColumn,
    addedLimitThreeColumn,
    addedLimitTwoColumn,
    addedLimitOneColumn,
  } = optionsUseSetterBisibleFilms;
  const [baseLimit, setBaseLimit] = useState(12);
  const [addedLimit, setAddedLimit] = useState(3);
  const [cntAddedContent, setCntAddedContent] = useState(0);
  const [cntVisibleFilms, setCntVisibleFilms] = useState<any>(null);

  const toTwoColumn = useMediaQuery(`only screen and (max-width: ${toTwoColumnWidth}px)`);
  const toOneColumn = useMediaQuery(`only screen and (max-width: ${toOneColumnWidth}px)`);

  const onClickToAddContent = () => { setCntAddedContent(cntAddedContent + 1); };
  const onClickToReset = () => { setCntAddedContent(0); };

  useEffect(() => {
    if (toTwoColumn) {
      setBaseLimit(baseLimitTwoColumn);
      setAddedLimit(addedLimitTwoColumn);
    } else if (toOneColumn) {
      setBaseLimit(baseLimitOneColumn);
      setAddedLimit(addedLimitOneColumn);
    } else {
      setBaseLimit(baseLimitThreeColumn);
      setAddedLimit(addedLimitThreeColumn);
    }
  }, [toTwoColumn, toOneColumn]);

  useEffect(() => {
    setCntVisibleFilms(baseLimit + addedLimit * cntAddedContent);
  }, [baseLimit, addedLimit, cntAddedContent]);

  return { onClickToAddContent, cntVisibleFilms, onClickToReset };
}
