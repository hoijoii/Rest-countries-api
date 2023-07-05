export declare interface ICountry {
  name: IName,
  flags: Object
  capital: string[]
  population: number
  region: string
  subregion: string
  tld: string[]
  languages: Object
  currencies: Object
  borders: string[]
  cca3: string
}

export declare interface IName {
  common: string
  nativeName: Object
  official: string
}