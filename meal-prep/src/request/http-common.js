import axios from 'axios'

export const HTTP = axios.create({
  baseURL: "http://93.125.53.130:3010",
  // headers: {
  //   Authorization: "Bearer {token}"
  // }
})