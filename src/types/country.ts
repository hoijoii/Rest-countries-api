export declare interface ICountry {
  name: IName,
  flags: Object
  capital: Array<string>
  population: number
  region: string
  subregion: string
  tld: Array<string>
  languages: Object
  currencies: Object
  borders: Array<string>
}

export declare interface IName {
  common: string
  nativeName: Object
  official: string
}