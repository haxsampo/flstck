import { useState } from 'react'


export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const baseUrl = baseUrl

    const create = (resource) => {
        // ...
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}