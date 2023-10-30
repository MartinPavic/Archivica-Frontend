import { Cookie } from '@mui/icons-material'
import axios from 'axios'
import { redirect } from 'react-router-dom'

const apiUrl = 'http://localhost:4000/api/v1'

const publicInstance = axios.create({
  baseURL: apiUrl,
})


publicInstance.defaults.headers.Accept = 'application/json'
publicInstance.defaults.headers['Content-Type'] = 'application/json'
publicInstance.defaults.headers['Access-Control-Allow-Origin'] = '*'
publicInstance.defaults.headers['Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token']

export default function authHeader() {
  
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user'));
  }


  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}

export class Api {
  static postRegister = (email, password, firstName, lastName) => publicInstance.post('users/register', {
    email: email,
    password: password,
    firstName: firstName,
    lastName:lastName
  })
  .then(response => response.data.data)


  static postLogin = (email, password) => publicInstance.post('users/login', {
    email: email, 
    password: password
  })
  .then((response) => {
    if(response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response
  })

  static logout = () => {
    localStorage.removeItem("user")
  }

  //example
  static getModels = () => publicInstance.get('posts/', {
    headers: authHeader()
  })
}

