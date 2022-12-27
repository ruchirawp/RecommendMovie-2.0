import axios from 'axios'
const baseUrl = '/register'

const register = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
export default {register}


