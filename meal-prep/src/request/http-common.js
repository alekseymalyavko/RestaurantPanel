import axios from 'axios'

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const token = getCookie('Authorization');

export const AUTH = axios.create({
  baseURL: "http://93.125.53.130:3010",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const HTTP = axios.create({
  baseURL: "http://93.125.53.130:3010",
  headers: {
    Authorization: `Bearer ${token}`,
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Headers':'*'
  }
})