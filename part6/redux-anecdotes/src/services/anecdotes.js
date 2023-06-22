import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const resp = await axios.post(baseUrl, object)
    return resp.data
}

const voteFor = async (id, changed) => {
    const resp = await axios.put(`${baseUrl}/${id}`, changed)
    return resp.data
}

export default { getAll, createNew, voteFor }