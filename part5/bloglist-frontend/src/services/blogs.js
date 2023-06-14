import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  /*
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  */
  const resp = await axios.get(baseUrl)
  return resp.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log("newobject in service", newObject, "   url:", `${baseUrl}/${id}`)
  //const request = axios.put(`${baseUrl} /${id}`, newObject)
  const resp = await axios.put(`${baseUrl}/${id}`, newObject)
  return resp
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update }