import axios from 'axios'
import { getCookie } from './cookie.js'

export const AUTH = axios.create({
  baseURL: "http://restaurant.eda-foodtech.by",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const HTTP = axios.create({
  baseURL: "http://93.125.53.130:3010",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getCookie('Authorization')}`
  },
})