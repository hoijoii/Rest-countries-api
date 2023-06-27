import axios from 'axios'

/* export default class RestUtils {
  public static get(url:string, params?: any): Promise<any> {
    return axios.get(url, params).then((res)=>res.data)
  }
} */
const config = {
  baseUrl: "https://restcountries.com/v3.1"
}

const getRestCountries = (url?:string, params?: any) => {
  console.log(config.baseUrl + (url ? url : '') + (params ? '/' + params : ''))
  return axios.get(config.baseUrl + (url ? url : '') + (params ? '/' + params : ''))
}

export {
  getRestCountries
}