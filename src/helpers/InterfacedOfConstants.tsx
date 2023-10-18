export interface IformSettings {
  name: string,
  title: string,
  sbtBtnText: string,
  questionText: string,
  pathLink: string,
  linkText: string
}

export interface IoptionsUseSetterVisibleFilms {
  toTwoColumnWidth: number,
  toOneColumnWidth: number,
  baseLimitThreeColumn: number,
  baseLimitTwoColumn: number,
  baseLimitOneColumn: number,
  addedLimitThreeColumn: number,
  addedLimitTwoColumn: number,
  addedLimitOneColumn: number,
}

export interface IinputSearcherValiditySettings {
  regEx: RegExp,
  erTextNoLetter: string,
  erTextOneLetter: string,
}

export interface IinputUserDataSettings {
  id: string,
  name: string,
  placeholder: string,
  type: string,
  pattern: string,
  title: string,
}
