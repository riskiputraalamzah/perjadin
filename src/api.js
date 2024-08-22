import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000' // URL backend Express.js
})

export default api
