const changeTimeFormat = (duration: number): string => {
  const first = Math.floor(duration / 60);
  const second = duration % 60;

  return [first > 0 && `${first}ч`, second > 0 && `${second}м`]
    .filter((el) => el)
    .join(' ');
};

export default changeTimeFormat;
