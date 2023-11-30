import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dev-sportbook101.ambapi.co/a/m',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
