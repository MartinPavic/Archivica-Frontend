import axios from 'axios'

const apiUrl = 'http://localhost:4000/api/v1'

const publicInstance = axios.create({
  baseURL: apiUrl,
})

publicInstance.defaults.headers.Accept = 'application/json'
publicInstance.defaults.headers['Content-Type'] = 'application/json'
publicInstance.defaults.headers['Access-Control-Allow-Origin'] = '*'

export class Api {
  static postRegister = (email, password, firstName, lastName) => publicInstance.post('users/register', {
    email: email,
    password: password,
    firstName: firstName,
    lastName:lastName
  })
  .then(response => response.data.data)
}
